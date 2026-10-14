import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CONSENT_VERSION, validateSubscribe } from '../shared/subscribe.js';

// Best-effort, per-instance rate limit. For stronger protection add Vercel Firewall rate limiting.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}

function originAllowed(req: VercelRequest): boolean {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = req.headers.host;
  const allowed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    const o = new URL(origin);
    return o.host === host || allowed.includes(o.origin);
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ status: 'error', message: 'Method not allowed.' });
  }
  if (!originAllowed(req)) return res.status(403).json({ status: 'error', message: 'Request not allowed.' });

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (limited(ip)) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({ status: 'error', message: 'Too many attempts. Please try again later.' });
  }

  const parsed = validateSubscribe(req.body);
  if (!parsed.ok) return res.status(400).json({ status: 'invalid', errors: parsed.errors });

  // Honeypot: pretend success so bots learn nothing, store nothing.
  if (parsed.value.website) return res.status(200).json({ status: 'ok' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return res.status(503).json({
      status: 'unconfigured',
      message: 'Launch notifications are not available yet. Please check back soon.',
    });
  }

  try {
    const r = await fetch(`${url.replace(/\/$/, '')}/rest/v1/launch_subscribers`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        email: parsed.value.email,
        name: parsed.value.name ?? null,
        consent_given: true,
        consent_text_version: CONSENT_VERSION,
        source: 'website',
      }),
    });
    if (r.status === 201 || r.status === 204) return res.status(200).json({ status: 'ok' });
    if (r.status === 409) return res.status(200).json({ status: 'duplicate' });
    console.error('Supabase insert failed', r.status);
    return res.status(502).json({ status: 'error', message: 'We could not save your details. Please try again.' });
  } catch (e) {
    console.error('Supabase request error', e instanceof Error ? e.message : e);
    return res.status(502).json({ status: 'error', message: 'We could not save your details. Please try again.' });
  }
}
