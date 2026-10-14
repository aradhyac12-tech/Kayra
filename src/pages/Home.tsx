import { Link } from 'react-router-dom';
import Botanical from '../components/Botanical';
import Figure from '../components/Figure';
import Ledger from '../components/Ledger';
import Reveal from '../components/Reveal';
import SignupForm from '../components/SignupForm';
import InstagramSection from '../components/InstagramSection';
import { site } from '../config/site';
import { articles } from '../content/journal';
import { photos } from '../content/images';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 data-hero="1">
              Ancient wisdom. <em>Thoughtfully yours.</em>
            </h1>
            <p className="lede" data-hero="2">
              Kaayra Herbals is a new Ayurvedic wellness company from India. We are taking our time to get sourcing, safety and
              transparency right before we offer anything.
            </p>
            <div className="hero-actions" data-hero="3">
              <Link className="btn" to="/#notify">Get launch updates</Link>
              <Link className="link-arrow" to="/our-approach">See how we work</Link>
            </div>
            <p className="status-note" data-hero="4">
              Nothing is for sale yet. Our formulations are concepts under development, and none has been approved or tested.
            </p>
          </div>
          <div data-hero="2">
            <Figure
              photo={photos.hero}
              priority
              fallback={<Botanical />}
              caption={photos.hero ? undefined : 'Illustration, not a product image.'}
            />
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="philosophy">
        <div className="wrap split">
          <Reveal>
            <h2 id="philosophy">Slow, on purpose.</h2>
          </Reveal>
          <Reveal>
            <p className="lede">
              Herbal wellness is crowded with big promises. We would rather earn trust first, by explaining what we are making,
              how we are deciding, and what we do not yet know.
            </p>
            <p>
              Kaayra is built on Ayurveda as a living tradition. We treat it with respect, which includes being clear about the
              difference between traditional use and proven effect.
            </p>
            <p><Link className="link-arrow" to="/our-story">Read our story</Link></p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="approach">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="approach">Questions before products.</h2>
            <p className="lede">Every formulation we explore has to answer the same three questions before it goes any further.</p>
          </Reveal>
          <Reveal className="grid-3">
            {[
              ['Where does it come from?', 'Which plant, which part, from where, and how is its identity confirmed?'],
              ['Is it safe?', 'Who should not use it, what could it interact with, and what must it be tested for?'],
              ['What may we say?', 'What do Indian licensing and labelling rules allow us to make and claim?'],
            ].map(([t, d]) => (
              <div className="principle" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </Reveal>
          <p style={{ marginTop: '2.5rem' }}><Link className="link-arrow" to="/our-approach">Read our full approach</Link></p>
        </div>
      </section>

      <section className="section section--forest on-dark" aria-labelledby="transparency">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="transparency">What we intend to publish.</h2>
            <p className="lede">These are the principles we are building toward, and the standard we want to be held to at launch.</p>
          </Reveal>
          <Reveal className="grid-2">
            {[
              ['Botanical names and plant parts', 'Every ingredient named precisely, so there is no doubt which plant is meant.'],
              ['Origin, where verifiable', 'Sourcing information only when we can substantiate it.'],
              ['Test results in full', 'If we publish quality or safety testing, we publish the real report, not a summary.'],
              ['Plain limits', 'We will say what traditional use suggests and what the evidence does or does not show.'],
            ].map(([t, d]) => (
              <div className="principle" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="products">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="products">Where we are, honestly.</h2>
            <p className="lede">
              We are exploring a small range of classical Ayurvedic formats. They are concepts. There is no shop, price, stock or
              checkout, and there won’t be until the products and the business are ready.
            </p>
          </Reveal>
          <Reveal>
            <Ledger />
          </Reveal>
          <p style={{ marginTop: '2.5rem' }}><Link className="link-arrow" to="/product-development">See what is being explored</Link></p>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="journal">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="journal">Reading, not selling.</h2>
            <p className="lede">Educational pieces on Ayurveda, ingredients and responsible product development.</p>
          </Reveal>
          <Reveal className="journal-grid">
            {articles.map((a) => (
              <article className="post" key={a.slug}>
                <span className="meta">{a.readingMinutes} minute read</span>
                <h3><Link to={`/journal/${a.slug}`}>{a.title}</Link></h3>
                <p>{a.excerpt}</p>
              </article>
            ))}
          </Reveal>
          <p style={{ marginTop: '2.5rem' }}><Link className="link-arrow" to="/journal">All articles</Link></p>
        </div>
      </section>

      <InstagramSection profileUrl={site.instagram} />

      <section id="notify" tabIndex={-1} className="section section--forest on-dark" aria-labelledby="notify-title">
        <div className="wrap split">
          <Reveal>
            <h2 id="notify-title">Hear from us when there is something real to say.</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Optional, and only about our launch. We do not share your details, and you can ask us to remove them at any time.
            </p>
          </Reveal>
          <Reveal>
            <SignupForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
