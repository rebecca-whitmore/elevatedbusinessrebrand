# Elevated Business - website specification

## Outcome

Convert service-business visitors into application starts by explaining the no-design-fee offer clearly, showing the intended quality of work and answering the obvious “what’s the catch?” concern. Primary action: apply for a free website at `/apply`.

## Approved direction

- Static Vercel deployment; no WordPress dependency.
- Shared header and footer are provided by the `eb-site-header` and `eb-site-footer` components in `js/site-components.js`.
- Vercel clean URLs are enabled, so page routes do not display `.html`.
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

## Site map

- `/` - homepage and core offer
- `/meet-rebecca` - Rebecca's experience, values, creative approach and long-term relationship promise
- `/how-it-works` - demo-first process, indicative timing and best-fit clients
- `/apply` - focused multi-step application connected to Forminit
- `/application-confirmed` - email-link landing page confirming permission to begin the demo
- `/concept-aesthetics` - fictional calm aesthetics homepage concept
- `/concept-travel` - fictional blue-toned travel consultant homepage concept
- `/concept-coach` - fictional black-and-white business coaching homepage concept

## Audience and process

- Best suited to relationship-led service businesses such as travel professionals, personal trainers, virtual assistants, coaches, therapists and beauticians.
- Typical sites contain four or five pages, shaped around the business rather than a fixed page allowance.
- Journey: application, confirmation email click, initial demo, refinements, domain connection and launch.
- The initial demo is aimed within 24 hours on working days. A typical site may launch within three to five working days when content and feedback arrive promptly.
- Timing is positioned as an aim, not a guarantee.

## Behaviour and accessibility

- Responsive navigation at tablet/mobile widths.
- Scroll-responsive hero starburst.
- Scroll reveals, pulsing emphasis and arrow motion stop under `prefers-reduced-motion`.
- Inspiration previews use native dialogs with close buttons, Escape support and click-outside closing.
- Semantic headings, skip link, visible keyboard focus and labelled controls are included.

## Open items before launch

- Replace all portrait and portfolio placeholders with approved assets.
- Build the application questions, validation, submission handling, confirmation email and two success states.
- Confirm whether ongoing project communication will use email or WhatsApp.
- Confirm the final service terms and FAQ wording, especially cancellation, unlimited edits, backup frequency and ongoing-support boundaries.
- Add approved privacy/terms links and analytics configuration.
- Complete rendered desktop/mobile, keyboard and live-form QA before production sign-off.
