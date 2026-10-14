import { Link } from 'react-router-dom';
import { CONSENT_VERSION } from '../../shared/subscribe';
import { site } from '../config/site';

export default function Privacy() {
  const who = site.legalEntity || site.name;
  return (
    <section className="section">
      <div className="wrap">
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Privacy Policy</h1>
        <p className="muted">Consent text version {CONSENT_VERSION}</p>
        <div className="prose" style={{ marginTop: '2rem' }}>
          <p className="notice">
            This policy describes how this website works today. It should be reviewed by a qualified legal professional familiar
            with Indian data-protection law before launch.
          </p>
          <h2>Who we are</h2>
          <p>{who} operates this website.{site.email ? <> Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.</> : <> Contact details will be published on the <Link to="/contact">Contact page</Link>.</>}</p>
          <h2>What we collect</h2>
          <p>
            Only what you give us through the launch-list form: your email address, and your name if you choose to add it. We also
            record that you gave consent, when you did, and which version of the consent wording you saw.
          </p>
          <h2>Why we use it</h2>
          <p>To tell you about Kaayra’s launch. We will not use it for anything else without asking you first, and we do not sell it.</p>
          <h2>Who handles it</h2>
          <p>
            The website is hosted on Vercel, and launch-list details are stored in a Supabase database. These providers process
            data on our behalf. Their own policies apply to their systems.
          </p>
          <h2>How long we keep it</h2>
          <p>Until you ask us to remove it or the launch list is closed.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete your details, or withdraw your consent, at any time{site.email ? <> by emailing <a href={`mailto:${site.email}`}>{site.email}</a></> : <> using the contact details on our Contact page once published</>}.
          </p>
          <h2>Third-party content</h2>
          <p>
            The homepage offers an optional Instagram profile preview. It loads Instagram's third-party embed script only after you
            choose to load the preview. Instagram/Meta may receive technical information about your browser and visit under its own
            privacy terms. You can use the direct profile link instead without loading the embedded preview.
          </p>
          <h2>Cookies and analytics</h2>
          <p>This website does not intentionally set its own advertising or analytics cookies. Optional third-party embeds may use their own technologies when you choose to load them.</p>
          <h2>Children</h2>
          <p>This website is not intended for children, and the launch list is for adults.</p>
        </div>
      </div>
    </section>
  );
}
