# Elevated Business project structure

## Active holding page

`/index.html` is the public holding page at the root URL. It intentionally contains only the Elevated Business name and a coming-soon message. It must not link to unfinished work.

## Planned EB website

The future sales site will contain Home, Services, Demos, About and Contact. Its reserved source structure is under `/future-site/`: `home/`, `services/`, `demos/` (for the future EB demo showcase at `/demos/`), `about/`, and `contact/`.

When the sales website is approved, move the completed future Home page and its required assets into the root in place of `/index.html`; add the completed internal routes at that time. Do not link the holding page to these unfinished areas.

## Client demos

The six independent homepage demos are reserved at `/demos/amber/`, `/demos/bella/`, `/demos/clara/`, `/demos/daphne/`, `/demos/elsie/` and `/demos/francesca/`. Wait for an individual design brief before building any of them.

Each demo must own its HTML, CSS, JavaScript and image assets so it can be copied into a client repository without depending on Elevated Business files. Once built, each demo will include a removable EB-only demo bar with Back to demos, Enquire about this design, and a clear demonstration label. Demo booking and enquiry actions must use deliberate demonstration behaviour rather than imply a real clinic booking or contact.

Vercel uses trailing-slash URLs so that each demo can keep portable relative paths such as `styles.css`, `script.js` and `assets/` when served from its own folder.
