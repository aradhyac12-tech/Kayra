import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import routes from '../../shared/routes.json';
import { site } from '../config/site';

const NAV = [
  { to: '/our-story', label: 'Our Story' },
  { to: '/our-approach', label: 'Our Approach' },
  { to: '/journal', label: 'Journal' },
  { to: '/product-development', label: 'Product Development' },
  { to: '/contact', label: 'Contact' },
];

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

function useRouteMeta(pathname: string) {
  useEffect(() => {
    const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const meta = routes.find((r) => r.path === clean);
    const title = meta?.title ?? 'Page not found | Kaayra Herbals';
    document.title = title;
    if (meta) {
      setMeta('meta[name="description"]', 'content', meta.description);
      setMeta('meta[property="og:title"]', 'content', meta.title);
      setMeta('meta[property="og:description"]', 'content', meta.description);
      setMeta('link[rel="canonical"]', 'href', site.url + (clean === '/' ? '/' : clean));
      setMeta('meta[property="og:url"]', 'content', site.url + (clean === '/' ? '/' : clean));
    }
  }, [pathname]);
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  useRouteMeta(pathname);

  useEffect(() => {
    setOpen(false);
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        el.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Kaayra Herbals, home">
            Kaayra<span> Herbals</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="primary-nav" className="nav" aria-label="Primary" data-open={open}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>
                {n.label}
              </NavLink>
            ))}
            <Link className="nav-cta" to="/#notify">Launch updates</Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              Kaayra<span> Herbals</span>
            </Link>
            <p style={{ marginTop: '1rem', maxWidth: '24rem' }}>
              A new Indian Ayurvedic wellness company. Our formulations are in development and nothing is for sale yet.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/#notify">Launch updates</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact and legal</h2>
            <ul>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a>
                </li>
              )}
              {site.address && <li>{site.address}</li>}
              <li>
                <a href={site.instagram} rel="noopener noreferrer" target="_blank">
                  Follow Kaayra on Instagram
                </a>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/legal">Terms and Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalEntity || site.name}. All rights reserved.
          </span>
          <span>
            Educational information only, not medical advice. Kaayra does not currently sell products or offer consultations.
          </span>
        </div>
      </div>
    </footer>
  );
}
