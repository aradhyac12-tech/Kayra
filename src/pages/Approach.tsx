import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const steps: [string, string, string][] = [
  ['01', 'Source', 'We want to know the plant, the plant part, the growing region and the supplier, and how identity is confirmed before a raw material is accepted.'],
  ['02', 'Prepare', 'Powders, decoctions and other forms behave differently. We decide the form and method deliberately, with practitioner input, not by convenience.'],
  ['03', 'Test', 'Quality and safety testing is planned with accredited laboratories. We will not describe any result until a real test has produced it.'],
  ['04', 'Review', 'Safety, interactions, who should not use a product, warnings, and what the law lets us claim, reviewed with qualified professionals.'],
  ['05', 'Explain', 'Plain labels and a published ingredient story. Traditional use described as traditional use.'],
];

export default function Approach() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h1>How we plan to develop a formulation.</h1>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              This is our working method for the products we are exploring. It describes intentions at a pre-launch stage, not
              completed work.
            </p>
          </div>
          <Reveal className="card-list" >
            {steps.map(([n, t, d]) => (
              <div className="card" key={n}>
                <h3><span style={{ color: 'var(--brass-text)', marginRight: '0.75rem' }}>{n}</span>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--forest on-dark">
        <div className="wrap split">
          <Reveal>
            <h2>What we hold ourselves to.</h2>
          </Reveal>
          <Reveal>
            <ul className="checklist">
              <li>Name every ingredient with its botanical name and plant part.</li>
              <li>Publish origin information only when we can substantiate it.</li>
              <li>Publish full test reports, never selective summaries.</li>
              <li>Keep traditional use and demonstrated effect clearly separate.</li>
              <li>Make no cure, treatment or prevention claims.</li>
            </ul>
            <p style={{ marginTop: '2rem' }}><Link className="btn" to="/#notify">Get launch updates</Link></p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
