import { useEffect, useState } from 'react';

interface InstagramWindow extends Window {
  instgrm?: { Embeds?: { process: () => void } };
}

interface Props {
  profileUrl: string;
}

/** Loads Instagram's official profile embed only after an explicit user action. */
export default function InstagramSection({ profileUrl }: Props) {
  const [requested, setRequested] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    if (!requested) return;

    const instagramWindow = window as InstagramWindow;
    const processEmbeds = () => instagramWindow.instgrm?.Embeds?.process();
    const existing = document.querySelector<HTMLScriptElement>('script[data-kaayra-instagram-embed]');

    if (instagramWindow.instgrm?.Embeds) {
      processEmbeds();
      return;
    }

    if (existing) {
      const onLoad = () => processEmbeds();
      existing.addEventListener('load', onLoad, { once: true });
      return () => existing.removeEventListener('load', onLoad);
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.dataset.kaayraInstagramEmbed = 'true';
    script.onload = processEmbeds;
    script.onerror = () => setScriptFailed(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [requested]);

  return (
    <section className="section instagram-section" aria-labelledby="instagram-title">
      <div className="wrap instagram-grid">
        <div className="instagram-copy">
          <p className="eyebrow">A little more from Kaayra</p>
          <h2 id="instagram-title">Follow our journey.</h2>
          <p className="lede">
            Notes from our process, botanical details and updates as Kaayra takes shape. We are sharing the journey before we share products.
          </p>
          <p className="instagram-handle">@kaayraherbals_official</p>
          <div className="instagram-actions">
            <a className="btn" href={profileUrl} target="_blank" rel="noopener noreferrer">
              Visit Instagram <span aria-hidden="true">↗</span>
            </a>
            {!requested && (
              <button className="btn btn--ghost" type="button" onClick={() => setRequested(true)}>
                Load profile preview
              </button>
            )}
          </div>
          <p className="instagram-note">
            The preview is optional and loads from Instagram only when requested. If it is unavailable, use the profile link above.
          </p>
        </div>

        <div className="instagram-preview" aria-label="Instagram profile preview">
          {!requested ? (
            <div className="instagram-placeholder">
              <span className="instagram-mark" aria-hidden="true">◎</span>
              <span className="instagram-placeholder-title">Kaayra on Instagram</span>
              <span className="instagram-placeholder-handle">@kaayraherbals_official</span>
              <span className="instagram-placeholder-caption">Load the official profile preview when you are ready.</span>
            </div>
          ) : (
            <>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={profileUrl}
                data-instgrm-version="14"
                style={{ background: '#fffdf8', border: 0, borderRadius: '4px', boxShadow: 'none', margin: '0 auto', maxWidth: '540px', minWidth: '0', padding: 0, width: '100%' }}
              >
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer">View @kaayraherbals_official on Instagram</a>
                </div>
              </blockquote>
              {scriptFailed && (
                <p className="form-status form-status--info" role="status">
                  Instagram's preview could not be loaded. The profile link remains available.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
