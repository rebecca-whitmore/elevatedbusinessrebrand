# Elevated Business website

A static multi-page website ready to deploy through Vercel. Shared navigation and footer markup lives in `js/site-components.js`. Clean URLs are configured in `vercel.json`.

Routes: `/`, `/meet-rebecca`, `/how-it-works`, `/apply`, `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions`, `/concept-aesthetics`, `/concept-travel`, `/concept-coach`, and the custom `404.html` fallback.

## Preview locally

Open `index.html` directly in a browser, or run a small local server from this folder.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository into Vercel.
3. Leave the framework preset as **Other** and the build command empty.
4. Deploy from the repository root.

Vercel can serve `index.html` directly, so this version needs no package installation or build step. JavaScript controls the responsive navigation, scroll effects, inspiration-site dialogs and current year.

The application form submits through Forminit. Analytics is not yet connected. The policy pages contain clearly labelled placeholder copy and remain `noindex` until approved legal text is added. See `PROJECT-SPEC.md` for the current decisions and open items.

## Design tokens

- Neon CTA/accent: `#c0ff15`
- Lilac surface: `#f9f1fe`
- Electric blue contrast accent: `#5957ff`
- Black: `#0b0b0b`
- Silver off-white: `#f1f2f0`
