import { Link } from 'react-router-dom';
import { hasContactRoute, site } from '../config/site';

export default function Contact() {
  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <h1>Contact</h1>
        </div>
        <div>
          {hasContactRoute ? (
            <dl className="defs">
              {site.email && (
                <div>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
                </div>
              )}
              {site.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd><a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a></dd>
                </div>
              )}
              {site.address && (
                <div>
                  <dt>Address</dt>
                  <dd>{site.address}</dd>
                </div>
              )}
              {site.legalEntity && (
                <div>
                  <dt>Registered name</dt>
                  <dd>{site.legalEntity}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="form-status form-status--info">
              Our public contact details are being finalised. In the meantime, you can join the launch list and we will be in touch
              when we have something to share.
            </p>
          )}
          <p className="notice">
            We cannot give medical advice, diagnose conditions or recommend treatment. Please do not send health information. For
            health concerns, speak to a qualified practitioner or doctor.
          </p>
          <p><Link className="btn" to="/#notify">Join the launch list</Link></p>
        </div>
      </div>
    </section>
  );
}
