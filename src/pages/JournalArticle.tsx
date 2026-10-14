import { Link, useParams } from 'react-router-dom';
import { getArticle } from '../content/journal';
import NotFound from './NotFound';

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function JournalArticle() {
  const { slug = '' } = useParams();
  const a = getArticle(slug);
  if (!a) return <NotFound />;
  return (
    <article className="article">
      <div className="wrap">
        <p><Link to="/journal">Back to the journal</Link></p>
        <h1>{a.title}</h1>
        <p className="muted">
          <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>, {a.readingMinutes} minute read, by Kaayra Herbals
        </p>
        <div className="prose" style={{ marginTop: '2.5rem' }}>
          {a.body.map((s, i) => (
            <section key={i}>
              {s.h && <h2>{s.h}</h2>}
              {s.p.map((t, j) => (
                <p key={j}>{t}</p>
              ))}
            </section>
          ))}
        </div>
        <p className="notice">
          Educational information only. It is not medical advice, and it does not describe any Kaayra product, none of which is
          currently for sale.
        </p>
        <p><Link className="link-arrow" to="/journal">More articles</Link></p>
        <p><Link className="btn" to="/#notify">Get launch updates</Link></p>
      </div>
    </article>
  );
}
