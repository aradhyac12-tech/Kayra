import { Link } from 'react-router-dom';
import Ledger from '../components/Ledger';
import Reveal from '../components/Reveal';

const concepts: [string, string][] = [
  ['Leuco Shots', 'A 30 ml Ayurvedic decoction format, imagined for simple everyday use.'],
  ['Triphala Churna', 'A powder form of the classical three-fruit preparation.'],
  ['Ashwagandha Churna', 'A powder form based on Ashwagandha root.'],
  ['Brahmi Churna', 'A powder form of a classical Ayurvedic herb.'],
  ['Dashamoola Kwath', 'A decoction form of the classical ten-root preparation.'],
];

export default function ProductDevelopment() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h1>What we are exploring.</h1>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              These are ideas, not products. None is for sale, none has been approved, and none has been tested.
            </p>
          </div>
          <Reveal className="card-list">
            {concepts.map(([name, desc]) => (
              <div className="card" key={name}>
                <h3>{name}</h3>
                <p>{desc}</p>
                <span className="badge">Concept, not for sale</span>
              </div>
            ))}
          </Reveal>
          <p className="notice">
            Names are classical formulation names and working titles. Ingredient lists, formats, packaging and availability are
            undecided. We make no claim about what any of them does.
          </p>
        </div>
      </section>

      <section className="section section--sand">
        <div className="wrap split">
          <Reveal>
            <h2>What still has to happen.</h2>
            <p>Each stage must be finished before the next begins.</p>
          </Reveal>
          <Reveal>
            <Ledger />
            <p style={{ marginTop: '2rem' }}><Link className="btn" to="/#notify">Get launch updates</Link></p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
