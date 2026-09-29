# Elevated Business - homepage specification

## Outcome

Convert small-business visitors into application starts by explaining the no-design-fee offer clearly, showing the intended quality of work and answering the obvious “what’s the catch?” concern. Primary action: start an application. The final application URL is still required.

## Approved direction

- Static Vercel deployment; no WordPress dependency.
- Shared footer is provided by the `eb-site-footer` component in `js/site-components.js` for reuse across future pages.
- Bold editorial design retained from the coming-soon page.
- Core palette: neon `#c0ff15`, lilac `#f9f1fe`, blue `#5957ff`, black `#0b0b0b`, silver `#f1f2f0`.
- Coral `#ff654f` is reserved for the persistent back-to-top control.
- Reference principles: oversized central promise, layered site previews, alternating light/dark pacing, highly visible CTAs and spacious portfolio presentation.
- All portfolio and portrait imagery is explicitly presented as placeholder material until genuine assets are supplied.

## Homepage journey

1. Hero promise, CTA and three illustrative site previews.
2. Reinforcement strip: no design fee, secure hosting, ongoing care and personal service.
3. Rebecca introduction and customer problem.
4. The commercial “secret” and introduction to free web design.
5. Included-service list and domain note.
6. Transparent explanation of why there is no design fee.
7. Offer-summary CTA strip.
8. Three modal inspiration-site previews.
9. Guided-support reassurance.
10. Three-step process and payment/editing clarification.
11. Centred framed FAQs.
12. Final application CTA.

## Behaviour and accessibility

- Responsive navigation at tablet/mobile widths.
- Scroll-responsive hero starburst.
- Scroll reveals, pulsing emphasis and arrow motion stop under `prefers-reduced-motion`.
- Inspiration previews use native dialogs with close buttons, Escape support and click-outside closing.
- Semantic headings, skip link, visible keyboard focus and labelled controls are included.

## Open items before launch

- Replace all portrait and portfolio placeholders with approved assets.
- Connect every application CTA to the confirmed form/page URL.
- Confirm the final service terms and FAQ wording, especially cancellation, unlimited edits, backup frequency and ongoing-support boundaries.
- Add approved privacy/terms links and analytics configuration.
- Complete rendered desktop/mobile, keyboard and live-form QA before production sign-off.

## Blog integration

- `blog.html` reuses the shared visual system and `eb-site-footer` component.
- The page fetches posts from `https://backoffice.elevatedbusiness.co.uk/wp-json/wp/v2/posts` and renders each WordPress title and content field into `#posts`.
- Endpoint verification on 29 September 2026 returned `403 Forbidden`. The back-office host or security layer must permit public REST requests and cross-origin access from the production Vercel domain before the feed can populate.
