import { Link } from 'react-router-dom';
import Botanical from '../components/Botanical';
import Figure from '../components/Figure';
import Reveal from '../components/Reveal';
import { photos } from '../content/images';

export default function Story() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Beginning carefully.</h1>
            <p className="lede">
              Kaayra Herbals is a new Indian Ayurvedic wellness company. This page tells you only what is true today.
            </p>
          </div>
          <Figure photo={photos.story} fallback={<Botanical variant="a" />} caption={photos.story ? undefined : 'Illustration, not a product image.'} />
        </div>
      </section>

      <section className="section section--sand">
        <div className="wrap prose">
          <Reveal>
            <h2>Where we are</h2>
            <p>
              Kaayra is at the earliest stage. Our products are still being developed, and we have not launched, approved or
              tested anything for sale.
            </p>
            <p>
              We chose to build this website before the products because we would like people to understand how we think
              before they are asked to buy anything.
            </p>
            <h2>What guides us</h2>
            <p>
              Ayurveda is a long-standing tradition, and we want to approach it with respect and without exaggeration. In
              practice that means three commitments: say what is known, say what is not, and never present tradition as
              proof.
            </p>
            <h2>What we are not doing</h2>
            <p>
              We are not selling products, offering consultations or giving personalised recommendations. If you need advice
              about your health, please speak to a qualified practitioner or doctor.
            </p>
            <p>
              <Link className="btn" to="/#notify">Join the launch list</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
