import { useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, validateSubscribe, type FieldErrors } from '../../shared/subscribe';

type State =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'ok' }
  | { kind: 'duplicate' }
  | { kind: 'unconfigured' }
  | { kind: 'error'; message: string };

export default function SignupForm() {
  const uid = useId();
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === 'submitting') return;
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get('email') ?? ''),
      name: String(form.get('name') ?? ''),
      consent: form.get('consent') === 'on',
      website: String(form.get('website') ?? ''),
    };

    const result = validateSubscribe(payload);
    if (!result.ok) {
      setErrors(result.errors);
      (result.errors.email ? emailRef : consentRef).current?.focus();
      return;
    }
    setErrors({});
    setState({ kind: 'submitting' });

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { status?: string; errors?: FieldErrors; message?: string } | null;
      if (!data) throw new Error('bad response');
      if (data.status === 'ok') return setState({ kind: 'ok' });
      if (data.status === 'duplicate') return setState({ kind: 'duplicate' });
      if (data.status === 'unconfigured') return setState({ kind: 'unconfigured' });
      if (data.status === 'invalid' && data.errors) {
        setErrors(data.errors);
        return setState({ kind: 'idle' });
      }
      setState({ kind: 'error', message: data.message ?? 'Something went wrong. Please try again.' });
    } catch {
      setState({ kind: 'error', message: 'We could not reach the server. Please check your connection and try again.' });
    }
  }

  if (state.kind === 'ok' || state.kind === 'duplicate') {
    return (
      <p className="form-status form-status--ok" role="status">
        {state.kind === 'ok'
          ? 'Thank you. Your email has been added to the Kaayra launch list. We will only write to you about our launch.'
          : 'This email is already on the Kaayra launch list. No further action is needed.'}
      </p>
    );
  }

  const busy = state.kind === 'submitting';
  return (
    <form className="signup" onSubmit={onSubmit} noValidate aria-label="Launch notification sign-up">
      <div className="field">
        <label htmlFor={`${uid}-name`}>Name (optional)</label>
        <input id={`${uid}-name`} name="name" type="text" autoComplete="given-name" maxLength={MAX_NAME_LENGTH} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
        {errors.name && <p className="field-error" id={`${uid}-name-err`}>{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor={`${uid}-email`}>Email address</label>
        <input ref={emailRef} id={`${uid}-email`} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={MAX_EMAIL_LENGTH} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
        {errors.email && <p className="field-error" id={`${uid}-email-err`}>{errors.email}</p>}
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label className="consent">
          <input ref={consentRef} type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${uid}-consent-err` : undefined} />
          <span>
            I agree that Kaayra Herbals may store my email address and contact me about its launch. I can withdraw this at any time. See the{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && <p className="field-error" id={`${uid}-consent-err`}>{errors.consent}</p>}
      </div>
      <div>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Sending…' : 'Notify me at launch'}
        </button>
      </div>
      <div aria-live="polite">
        {state.kind === 'error' && <p className="form-status form-status--error">{state.message}</p>}
        {state.kind === 'unconfigured' && (
          <p className="form-status form-status--info">
            Launch notifications are not open yet. Please check back soon. Nothing has been saved.
          </p>
        )}
      </div>
    </form>
  );
}
