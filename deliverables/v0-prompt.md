Create a complete, production-quality English B2B website frontend for NINGBO YUANJING AUTOMOTIVE PARTS CO., LTD. This is the mandatory first visual design stage. Build a maintainable Next.js 16 App Router project with independent routes, TypeScript and accessible responsive components. Do not configure Supabase, the shared admin, R2 or deployment; Codex will connect those after source handoff.

Original visual request, preserve faithfully: website design style should reference https://openai.com/index/gpt-6-astra/ but must not use a black color tone. Flexibly use three.js; do not make a lifeless CSS-only site.

Interpretation boundaries: borrow only the reference's large editorial typography, confident whitespace, layered technical storytelling and calm long-page rhythm. Do not copy OpenAI branding, assets, exact layout or copy. Use a light, precise palette derived from the supplied official logo: warm ivory and cool light gray surfaces, crisp Yuanjing blue accents, charcoal text, clean metal highlights. Avoid black-dominant pages, generic blue-tech templates, neon glow, excessive rounded cards, particles and decorative noise.

Verified company facts:
- Formal Chinese company: 宁波圆景汽车配件有限公司.
- Formal English company: NINGBO YUANJING AUTOMOTIVE PARTS CO., LTD.
- Established in 2017 in Ningbo, China.
- Address: Building 24, Yida Science and Innovation City, Binhai Development Zone, Chunhu, Fenghua, Ningbo, Zhejiang, China.
- Public contact: info@yuanjingglobal.com; +86 133 5599 5506.
- Manufactures automotive brake pad backing plates and custom metal stamping parts.
- 3,000 m² facility; three production lines; automatic blanking, mold, packaging, shot blasting, quality-inspection and finished-goods areas.
- Equipment: two 200-ton hydraulic presses, five 160-ton high-precision presses, ten presses across 16/40/80/125/160 tons, two automatic punching systems, one automatic chamfering system, two deburring machines, one shot-blasting machine, and more than 1,000 backing-plate molds.
- Stated capacity: 1,000,000 pieces/month. Present lead time conditionally as typically 15–25 days depending on quantity and process; never promise an unconditional date.
- Supports drawing-based mold development, sampling and OEM/ODM.
- The customer states ISO 9001 certification, but no certificate scan was supplied. You may write a restrained text statement only; do not create or depict a certificate, certificate number, validity date or accreditation mark.

Verified launch products, each needs its own detail template with visible specifications and fitment:
1. D1344-8455 / OE 04465-25040; Q235B; 145.4 × 56.9 mm; Toyota Hiace, Dyna, Toyoace; Jinbei Granse/Hiace; Foton MPX; source MOQ 200 pcs.
2. D1044-7947 / WVA 23723/23724 / TRW GDB1583 / OE 30683554 and 3M51-2K021-AB; Q235B; 155.1/156.3 × 62.4/67 mm; Ford Focus, Mazda3, Volvo C30/C70/S40. Do not show a fixed MOQ because the source cell is explicitly an example.
3. D976 / OE 04465-35290; Q235B; 134.6 × 77.1 mm; Toyota Prado, Hilux, FJ Cruiser and Lexus GX; MOQ 200 pcs.
4. D2017 / OE 3501175-K00-J; Q235B; 167.2 × 54.3 mm; Great Wall Haval H3/H5 and Wingle; MOQ 200 pcs.
5. D1295 / WVA 24501/24502/24503 / GDB3461; Q235B; 137.8 × 61 mm; Hyundai Tucson/ix35 and Kia Sportage/Optima/Soul; MOQ 200 pcs.

Required routes and navigation: Home, Products, individual product detail routes, Capabilities, Applications, About Us, News with empty state and article-detail template, and Contact/Request a Quote. Navigation must explicitly include Home; the official logo also links home. Products has one real launch category, Brake Pad Backing Plates, slug brake-pad-backing-plates. Category and product cards must be fully keyboard- and touch-operable and lead to non-empty destinations. Architect locale-aware data access and i18n field mapping for future languages, but launch only English and do not generate empty locale pages.

Homepage stable section order and tasks:
hero — supplied three-slide campaign; model-finder — search/compare FMSI, OE, WVA and TRW references; applications — verified vehicle families; precision-scene — explain structural support and dimensional control; manufacturing — real facility/process evidence; tooling — mold development and OEM/ODM flow; quality — inspection and report availability; delivery — sampling, MOQ and conditional lead time; company — concise corporate profile; rfq — short request form. Each section adds new buyer information. Do not pad with repeated generic advantages.

Hero must use all three supplied 3840×1600 banner images as full-width background/visual assets, never as cards or a split layout. Use real DOM text and controls:
1. “Backing Plates Identified by the Numbers Buyers Use” / model discovery / Browse Models → /products.
2. “Steel Substrates Built Around Fit and Stability” / dimensions and assembly / Review Specifications → /products.
3. “From Tooling Development to Repeat Production” / mold development / Discuss a Drawing → /contact.
Use only minimal local text-area treatment; do not darken the whole image. Recompose on 390px, moving copy below the image if necessary. Include manual controls, pause, touch and reduced-motion behavior.

Three.js requirement: create one purposeful, lightweight section named YuanjingPrecisionScene. Use abstract neutral-metal plates, dimensional guide lines and a restrained press-tool relationship to explain precision and fit. It must be clearly illustrative, not represented as an exact customer product, machine or test result. It must lazy-load after the hero, pause offscreen, simplify or render static on 390px, stop under prefers-reduced-motion, and provide a polished SVG/static fallback when WebGL or JS is unavailable. No endless rotating object, particle field or performance-heavy full-page canvas.

Motion system: supplied banners use bounded cross-fade. Major sections and cards animate only when they actually enter the viewport; never use a fixed/global timeout that prematurely marks offscreen sections as revealed. Manufacturing evidence may use a desktop scroll-stack narrative but must become a normal ordered list on mobile/reduced motion. All content remains visible without JavaScript. Use short, clear hover/focus/press states for navigation, model cards, filters, FAQ and RFQ controls.

Media mapping: use the official LOGO file in header/footer and as the source for a customer-specific favicon. Preserve aspect ratio with object-fit contain and remove all v0/Next.js/template icons. The five supplied product images correspond in order to the five products above and must display completely with contain on a clean continuous light stage. The supplied factory photos are representative real evidence for facility/process composition; Codex will replace/expand them from the full 23-image ledger after download. Do not infer product count or customer count from attachment count. Do not expose the business-license image. The supplied MP4 is VIDEO-DEFAULT-OFF and is not an input.

RFQ: no prices, cart, checkout or payment. Provide fields for name, business email, company, model/cross-reference, quantity, drawing/specification need and message, with loading/success/error UI but no fake alert, console log or timeout success. Codex will implement secure server submission and image CAPTCHA.

Prohibitions: do not invent products, parameters, equipment, certification details, customers, partner logos, case studies, reviews, export numbers or countries. Do not use warranty, warranties, guarantee, guaranteed, quality guarantee, 质保 or 保修 anywhere, including metadata and structured data. Do not copy other sites' branding or assets. Do not publish internal audit language such as “customer supplied”, “verified”, “according to materials”, “documented models” or implementation notes. Do not use B2B as generic navigation or marketing copy. Do not place key English text inside generated images.

SEO/accessibility scaffolding: unique page metadata, canonical-ready URL helpers, Open Graph/Twitter structures, robots/sitemap route placeholders, Organization/WebSite/Product/Article/Breadcrumb JSON-LD components that omit unavailable prices/reviews, one h1 per page, descriptive alt text, visible focus, WCAG AA contrast and 44px touch targets. Use the formal English company name for the runtime-year footer copyright and normalize terminal punctuation.

Deliver complete source, not a screenshot. Ensure desktop and 390px layouts feel intentionally composed. Known omissions: there are no customer case studies, customer logos, certificate scans or real news articles; render no fake content for them.
