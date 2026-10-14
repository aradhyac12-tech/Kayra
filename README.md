# Kaayra Herbals: pre-launch website

Vite + React + TypeScript, statically prerendered, with one Vercel serverless function for launch-list sign-ups. No checkout, no products for sale, no simulated consultations.

## Run and deploy

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # site only; /api needs `npx vercel dev`
npm run lint && npm run typecheck && npm test && npm run build
```

Deploy: push to Git and import into Vercel (framework preset: Vite). Set the variables from `.env.example` in Project Settings > Environment Variables.

## Launch-notification backend (required setup)

1. Create a Supabase project and run `supabase/launch_subscribers.sql` in the SQL editor.
2. In Vercel set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server only, never `VITE_`-prefixed).
3. Until both are set, the form tells visitors that launch notifications are not open and saves nothing.

The endpoint (`api/subscribe.ts`) validates input, requires explicit consent, records consent time and wording version, treats repeat emails as "already subscribed", ignores honeypot submissions, checks the request origin and applies a best-effort per-instance rate limit. For stronger abuse protection add a Vercel Firewall rate-limit rule on `/api/subscribe`. No confirmation email is sent; add a double opt-in flow before sending any campaign.

## Instagram integration

The homepage includes a branded “Follow our journey” section and an optional official Instagram profile embed for `@kaayraherbals_official`. The embed script is loaded only after a visitor explicitly selects “Load profile preview”; the direct profile link works without loading the embed. `VITE_INSTAGRAM_URL` can override the canonical profile URL, but defaults to the official Kaayra profile. The account must be public and allow embeds for Instagram's preview to render reliably.

## Next phase

1. Set the final `VITE_SITE_URL` in Vercel so canonical URLs, Open Graph URLs and prerendered metadata use the real production domain (the current `.example` fallback is a placeholder).
2. Supply a real business contact email and verified legal entity details; review the privacy and legal pages with an India-qualified professional before collecting launch sign-ups.
3. Configure Supabase and the Vercel server-only environment variables, then test duplicate sign-ups, invalid submissions, rate limiting, deletion/withdrawal requests and production error states.
4. Replace the hero/section illustrations with owned or licensed brand photography. Do not use concept packaging as a real product.
5. Review journal articles with an appropriately qualified reviewer before marking them as reviewed or publishing health-related claims.
6. Run lint, type-check, tests, production build, mobile/accessibility checks and deployment smoke tests after dependencies can be installed.
7. Keep commerce disabled until product classification, licensing, manufacturing, labelling, claims, inventory, payments and fulfilment are ready.

## Status of this build

Written, but NOT yet run: `npm install` was blocked in the build environment (registry access denied by network policy), so lint, type-check, the vitest suite, the production build, the prerender step and browser checks (mobile layout, keyboard, accessibility, Lighthouse) have not been executed. The only checks run were a strict `tsc` pass on `shared/subscribe.ts` and a manual run of its validation cases. Run the commands above first and fix anything they report. Nothing has been deployed.

## Audit of the previous site (kaayraherbals.netlify.app)

The old site's repository was not available, so only the live page could be reviewed. This build is a fresh codebase, not a modification of it. Findings:

| Old feature | Status | Decision |
| --- | --- | --- |
| Prakriti five-question quiz | Client-side demo, no clinical basis | Removed; explained in the journal instead |
| Consultation booking ("demo request") | Prototype, no backend | Removed |
| My Care dashboard, Vaidya portal, video room preview, loyalty, referral | Simulated | Removed from the customer journey |
| "Kaayra Guide" chatbot | Offline scripted FAQ | Removed |
| Concept product names and Leuco Shots packaging imagery | Concepts | Names kept as labelled concepts; old imagery not carried over (not accessible) |

## Needs the owner before launch

- **Contact details and legal entity name**: set `VITE_CONTACT_*` and `VITE_LEGAL_ENTITY_NAME`. Fields stay hidden while blank, and the Privacy Policy's withdrawal route depends on an email being set.
- **Company story**: `src/pages/Story.tsx` states only what is known (new company, products in development). Add verified facts (founders, location, motivation) yourself.
- **Photography**: no photographs were available. Pages use a botanical line illustration. Add owned or licensed images via `src/content/images.ts`. Any concept packaging imagery must be labelled as conceptual.
- **Headline**: "Ancient wisdom. Thoughtfully yours." is used as provisional, as the brief allows. Confirm it.
- **Product concept names and descriptions** (`src/pages/ProductDevelopment.tsx`): taken from the old site; confirm they are still wanted.
- **Journal articles** (`src/content/journal.ts`): drafts with no health claims. Have a qualified Ayurvedic practitioner review them, then set `practitionerReviewed: true`.
- **OG image** (`public/og-image.png`): placeholder wordmark card; replace with a designed one.
- **Domain**: set `VITE_SITE_URL` so canonicals, sitemap and Open Graph URLs are correct.

## Regulatory and legal items requiring professional verification

Not legal advice, and nothing here has been verified. Before selling any product in India, take advice from a qualified regulatory/legal professional on:

- Manufacturing licensing and product-category classification for Ayurvedic products (drug vs food/nutraceutical) and the authorities involved.
- Food-business registration or licensing if any product is classed as food.
- Labelling requirements, and rules on advertising and health claims for Ayurvedic products.
- Trademark registration for "Kaayra" and the product names.
- Personal-data obligations under India's Digital Personal Data Protection Act, 2023 and its rules, for the launch list and Privacy Policy.
- E-commerce, consumer-protection, GST and payments requirements before enabling checkout.
- Review of the Privacy Policy and Terms texts, which are drafts.

## Structure

```
api/subscribe.ts            Vercel function (sign-up)
shared/                     Validation (used by browser and server), route metadata
supabase/                   SQL for the subscribers table
scripts/prerender.mjs       Renders routes to static HTML, writes sitemap, robots, 404
src/pages, src/components   Pages and UI
src/content                 Journal articles and photo slots
```

Reduced-motion is respected in CSS; reveals are progressive and content is visible without JavaScript.

## Design notes

- The development ledger (`src/components/Ledger.tsx`) is the page's signature element: an ordered, honest view of where Kaayra is. Only "Concept exploration" is marked current. **Confirm that status, and update it as real work happens.**
- Structured data (Organization on the home page, Article on journal pages) is injected at build time and contains only the company name, URL and article metadata. Add a logo and social profiles to it once they exist.
