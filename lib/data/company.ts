export const factStats = [
  { value: '2017', label: 'Established in Ningbo' },
  { value: '3,000 m²', label: 'Production facility' },
  { value: '3', label: 'Production lines' },
  { value: '1,000,000', label: 'Pieces per month, stated capacity' },
  { value: '1,000+', label: 'Backing-plate molds' },
] as const

export const factoryAreas = [
  'Automatic blanking',
  'Mold',
  'Packaging',
  'Shot blasting',
  'Quality inspection',
  'Finished goods',
] as const

export const equipment = [
  { count: '2', item: 'Hydraulic presses', spec: '200 ton' },
  { count: '5', item: 'High-precision presses', spec: '160 ton' },
  { count: '10', item: 'Presses', spec: '16 / 40 / 80 / 125 / 160 ton' },
  { count: '2', item: 'Automatic punching systems', spec: '' },
  { count: '1', item: 'Automatic chamfering system', spec: '' },
  { count: '2', item: 'Deburring machines', spec: '' },
  { count: '1', item: 'Shot-blasting machine', spec: '' },
  { count: '1,000+', item: 'Backing-plate molds', spec: 'Existing tooling library' },
] as const

export interface ProcessStep {
  id: string
  title: string
  text: string
  caption: string
  image: { src: string; width: number; height: number; alt: string }
}

export const processSteps: ProcessStep[] = [
  {
    id: 'facility',
    title: 'One 3,000 m² facility, three production lines',
    text: 'Building 24 at Yida Science and Innovation City holds three production lines, with separate areas for automatic blanking, molds, packaging, shot blasting, quality inspection and finished goods.',
    caption: 'Facility entrance, Building 24',
    image: {
      src: '/images/facility/facility-entrance.webp',
      width: 1773,
      height: 887,
      alt: 'Entrance of Building 24 with a brass nameplate, opening onto a press hall with a forklift and baskets of stamped plates',
    },
  },
  {
    id: 'blanking',
    title: 'Automatic blanking from sheet steel',
    text: 'Steel sheet is fed to the press on an automatic blanking line, cutting plate outlines in a repeatable first operation.',
    caption: 'Automatic blanking line',
    image: {
      src: '/images/facility/blanking-line.webp',
      width: 2559,
      height: 1259,
      alt: 'Automatic feeding rails carrying a large steel sheet into a press for blanking',
    },
  },
  {
    id: 'presses',
    title: 'Hydraulic and high-precision presses',
    text: 'Two 200-ton hydraulic presses and five 160-ton high-precision presses sit alongside ten presses across 16, 40, 80, 125 and 160 tons, so tonnage can follow the part.',
    caption: 'Press hall',
    image: {
      src: '/images/facility/press-hall.webp',
      width: 2559,
      height: 1273,
      alt: 'Press hall with a red hydraulic shear in the foreground, a green feeding frame and a press behind it',
    },
  },
  {
    id: 'deburring',
    title: 'Deburring before the next operation',
    text: 'Two deburring machines clean blanked edges. Plates run across the belt and leave ready for hole and edge operations.',
    caption: 'Deburring machine',
    image: {
      src: '/images/facility/deburring.webp',
      width: 2559,
      height: 1277,
      alt: 'Blanked backing plates travelling on a patterned belt through a deburring machine',
    },
  },
  {
    id: 'automatic',
    title: 'Automatic punching and chamfering',
    text: 'Two automatic punching systems and one automatic chamfering system handle hole and edge operations without hand feeding each plate.',
    caption: 'Automatic processing equipment',
    image: {
      src: '/images/facility/hole-processing.webp',
      width: 2559,
      height: 1274,
      alt: 'Close view of automatic processing equipment with a servo motor, cylinders and guide rails',
    },
  },
  {
    id: 'finishing',
    title: 'Shot blasting and finished goods',
    text: 'One shot-blasting machine prepares the surface. Finished plates move in baskets toward quality inspection, packaging and the finished-goods area.',
    caption: 'Finishing and handling',
    image: {
      src: '/images/facility/finishing-handling.webp',
      width: 2559,
      height: 1260,
      alt: 'Wire basket holding finished backing plates beside a finishing machine',
    },
  },
]

export const toolingSteps = [
  {
    title: 'Drawing or sample review',
    text: 'Send a drawing, a sample or a reference number. Outline, hole layout and material are confirmed before tooling starts.',
  },
  {
    title: 'Mold development',
    text: 'Tooling is developed from your drawing, supported by an existing library of more than 1,000 backing-plate molds.',
  },
  {
    title: 'Sampling',
    text: 'Sample plates are produced from the new mold so fit and dimensions can be reviewed before production.',
  },
  {
    title: 'OEM / ODM production',
    text: 'Approved parts move to repeat production on the three production lines, then to packaging and the finished-goods area.',
  },
] as const

export const faqItems = [
  {
    question: 'What is the minimum order quantity?',
    answer:
      'Most listed models start at 200 pcs. D1044-7947 is quoted per request, so tell us the quantity you expect and we will confirm it in the quote.',
  },
  {
    question: 'How long does production take?',
    answer:
      'Standard orders are delivered in 15 days. The date that applies to your order is confirmed in the quote.',
  },
  {
    question: 'Can you make a plate that is not listed?',
    answer:
      'Yes. We support drawing-based mold development, sampling and OEM/ODM production, and also manufacture custom metal stamping parts.',
  },
  {
    question: 'Which reference numbers can I search by?',
    answer:
      'Each model lists its FMSI number and, where applicable, OE, WVA and TRW references. If you only have a vehicle or a sample, send it and we will match it.',
  },
  {
    question: 'Can I request inspection reports?',
    answer:
      'Yes. Tell us which dimensions or documents you need when you request a quote or a sample, and we will confirm what can be provided.',
  },
] as const
