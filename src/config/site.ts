const env = import.meta.env;

const clean = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export const site = {
  name: 'Kaayra Herbals',
  tagline: 'Ancient wisdom. Thoughtfully yours.',
  url: (clean(env.VITE_SITE_URL) || 'https://kaayraherbals.example').replace(/\/$/, ''),
  // Contact details are intentionally blank until the owner supplies real ones (see .env.example).
  email: clean(env.VITE_CONTACT_EMAIL),
  phone: clean(env.VITE_CONTACT_PHONE),
  address: clean(env.VITE_CONTACT_ADDRESS),
  legalEntity: clean(env.VITE_LEGAL_ENTITY_NAME),
  instagram: (clean(env.VITE_INSTAGRAM_URL) || 'https://www.instagram.com/kaayraherbals_official/').replace(/\/$/, '') + '/',
} as const;

export const hasContactRoute = Boolean(site.email || site.phone || site.address);
