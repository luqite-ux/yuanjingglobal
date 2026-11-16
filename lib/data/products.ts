import {
  defaultLocale,
  localize,
  type Locale,
  type Localized,
} from '@/lib/i18n'

export const categorySlug = 'brake-pad-backing-plates'

export interface Vehicle {
  make: string
  models: string[]
}

interface ProductRecord {
  slug: string
  code: string
  title: Localized
  summary: Localized
  references: {
    fmsi: string[]
    oe: string[]
    wva: string[]
    trw: string[]
  }
  material: string
  dimensions: string
  dimensionNote?: Localized
  moq: number | null
  vehicles: Vehicle[]
  image: {
    src: string
    width: number
    height: number
    alt: Localized
  }
}

interface CategoryRecord {
  slug: string
  name: Localized
  description: Localized
  intro: Localized
  productSlugs: string[]
  image: ProductRecord['image']
}

const en = (value: string): Localized => ({ en: value })

const productRecords: ProductRecord[] = [
  {
    slug: 'd1344-8455',
    code: 'D1344-8455',
    title: en('D1344-8455 Brake Pad Backing Plate'),
    summary: en(
      'Q235B steel backing plate, 145.4 × 56.9 mm, with four large holes and two locating ears. Listed for Toyota Hiace, Dyna and Toyoace, Jinbei Granse and Hiace, and Foton MPX.',
    ),
    references: {
      fmsi: ['D1344-8455'],
      oe: ['04465-25040'],
      wva: [],
      trw: [],
    },
    material: 'Q235B',
    dimensions: '145.4 × 56.9 mm',
    moq: 200,
    vehicles: [
      { make: 'Toyota', models: ['Hiace', 'Dyna', 'Toyoace'] },
      { make: 'Jinbei', models: ['Granse', 'Hiace'] },
      { make: 'Foton', models: ['MPX'] },
    ],
    image: {
      src: '/images/products/d1344-8455.jpg',
      width: 1920,
      height: 1920,
      alt: en(
        'D1344-8455 steel brake pad backing plate with four round holes and a small locating ear on each end',
      ),
    },
  },
  {
    slug: 'd1044-7947',
    code: 'D1044-7947',
    title: en('D1044-7947 Brake Pad Backing Plate'),
    summary: en(
      'Q235B steel backing plate with wide shoulders, two large holes and three raised pins. Listed for Ford Focus, Mazda3 and Volvo C30, C70 and S40.',
    ),
    references: {
      fmsi: ['D1044-7947'],
      oe: ['30683554', '3M51-2K021-AB'],
      wva: ['23723', '23724'],
      trw: ['GDB1583'],
    },
    material: 'Q235B',
    dimensions: '155.1/156.3 × 62.4/67 mm',
    dimensionNote: en(
      'Slash-separated values cover the variants listed under this reference. Confirm the exact variant against your sample or drawing.',
    ),
    moq: null,
    vehicles: [
      { make: 'Ford', models: ['Focus'] },
      { make: 'Mazda', models: ['Mazda3'] },
      { make: 'Volvo', models: ['C30', 'C70', 'S40'] },
    ],
    image: {
      src: '/images/products/d1044-7947.jpg',
      width: 1920,
      height: 1920,
      alt: en(
        'D1044-7947 steel brake pad backing plate with two large holes, three raised pins and stepped shoulders',
      ),
    },
  },
  {
    slug: 'd976',
    code: 'D976',
    title: en('D976 Brake Pad Backing Plate'),
    summary: en(
      'Q235B steel backing plate, 134.6 × 77.1 mm, shown as a left and right pair with a shaped upper notch. Listed for Toyota Prado, Hilux and FJ Cruiser and Lexus GX.',
    ),
    references: {
      fmsi: ['D976'],
      oe: ['04465-35290'],
      wva: [],
      trw: [],
    },
    material: 'Q235B',
    dimensions: '134.6 × 77.1 mm',
    moq: 200,
    vehicles: [
      { make: 'Toyota', models: ['Prado', 'Hilux', 'FJ Cruiser'] },
      { make: 'Lexus', models: ['GX'] },
    ],
    image: {
      src: '/images/products/d976.jpg',
      width: 1920,
      height: 1920,
      alt: en(
        'Pair of D976 steel brake pad backing plates, each with two large holes, a curved upper notch and small lower holes',
      ),
    },
  },
  {
    slug: 'd2017',
    code: 'D2017',
    title: en('D2017 Brake Pad Backing Plate'),
    summary: en(
      'Q235B steel backing plate, 167.2 × 54.3 mm, with a long curved profile, two center holes and four raised pins. Listed for Great Wall Haval H3 and H5 and Wingle.',
    ),
    references: {
      fmsi: ['D2017'],
      oe: ['3501175-K00-J'],
      wva: [],
      trw: [],
    },
    material: 'Q235B',
    dimensions: '167.2 × 54.3 mm',
    moq: 200,
    vehicles: [{ make: 'Great Wall', models: ['Haval H3', 'Haval H5', 'Wingle'] }],
    image: {
      src: '/images/products/d2017.jpg',
      width: 1920,
      height: 1920,
      alt: en(
        'D2017 steel brake pad backing plate with a long curved profile, two center holes and four raised pins',
      ),
    },
  },
  {
    slug: 'd1295',
    code: 'D1295',
    title: en('D1295 Brake Pad Backing Plate'),
    summary: en(
      'Q235B steel backing plate, 137.8 × 61 mm, with four large holes and two raised pins. Listed for Hyundai Tucson and ix35 and Kia Sportage, Optima and Soul.',
    ),
    references: {
      fmsi: ['D1295'],
      oe: [],
      wva: ['24501', '24502', '24503'],
      trw: ['GDB3461'],
    },
    material: 'Q235B',
    dimensions: '137.8 × 61 mm',
    moq: 200,
    vehicles: [
      { make: 'Hyundai', models: ['Tucson', 'ix35'] },
      { make: 'Kia', models: ['Sportage', 'Optima', 'Soul'] },
    ],
    image: {
      src: '/images/products/d1295.jpg',
      width: 1920,
      height: 1920,
      alt: en(
        'D1295 steel brake pad backing plate with four large holes, two raised pins and a locating ear on each end',
      ),
    },
  },
]

const categoryRecords: CategoryRecord[] = [
  {
    slug: categorySlug,
    name: en('Brake Pad Backing Plates'),
    description: en(
      'Q235B steel backing plates identified by FMSI, OE, WVA and TRW references, with dimensions and vehicle fitment on every model page.',
    ),
    intro: en(
      'Stamped steel substrates for brake pads. Each model lists its reference numbers, material, overall dimensions and fitment, so a part can be matched before a drawing or sample is exchanged.',
    ),
    productSlugs: productRecords.map((p) => p.slug),
    image: productRecords[0].image,
  },
]

export interface ProductView {
  slug: string
  categorySlug: string
  href: string
  code: string
  title: string
  summary: string
  references: ProductRecord['references']
  material: string
  dimensions: string
  dimensionNote?: string
  moq: number | null
  moqLabel: string
  vehicles: Vehicle[]
  fitmentSummary: string
  image: { src: string; width: number; height: number; alt: string }
}

export interface CategoryView {
  slug: string
  href: string
  name: string
  description: string
  intro: string
  productCount: number
  image: ProductView['image']
}

export function productHref(slug: string) {
  return `/products/${categorySlug}/${slug}`
}

function toProductView(record: ProductRecord, locale: Locale): ProductView {
  return {
    slug: record.slug,
    categorySlug,
    href: productHref(record.slug),
    code: record.code,
    title: localize(record.title, locale),
    summary: localize(record.summary, locale),
    references: record.references,
    material: record.material,
    dimensions: record.dimensions,
    dimensionNote: record.dimensionNote
      ? localize(record.dimensionNote, locale)
      : undefined,
    moq: record.moq,
    moqLabel: record.moq ? `${record.moq} pcs` : 'Confirmed in your quote',
    vehicles: record.vehicles,
    fitmentSummary: record.vehicles
      .map((v) => `${v.make} ${v.models.join(', ')}`)
      .join(' · '),
    image: { ...record.image, alt: localize(record.image.alt, locale) },
  }
}

export function getProducts(locale: Locale = defaultLocale): ProductView[] {
  return productRecords.map((record) => toProductView(record, locale))
}

export function getProduct(
  slug: string,
  locale: Locale = defaultLocale,
): ProductView | undefined {
  const record = productRecords.find((p) => p.slug === slug)
  return record ? toProductView(record, locale) : undefined
}

export function getCategories(locale: Locale = defaultLocale): CategoryView[] {
  return categoryRecords.map((record) => ({
    slug: record.slug,
    href: `/products/${record.slug}`,
    name: localize(record.name, locale),
    description: localize(record.description, locale),
    intro: localize(record.intro, locale),
    productCount: record.productSlugs.length,
    image: { ...record.image, alt: localize(record.image.alt, locale) },
  }))
}

export function getCategory(
  slug: string,
  locale: Locale = defaultLocale,
): CategoryView | undefined {
  return getCategories(locale).find((c) => c.slug === slug)
}

export const referenceLabels = {
  fmsi: 'FMSI',
  oe: 'OE',
  wva: 'WVA',
  trw: 'TRW',
} as const

export function referenceGroups(product: ProductView) {
  return (
    Object.keys(referenceLabels) as (keyof typeof referenceLabels)[]
  )
    .map((key) => ({
      key,
      label: referenceLabels[key],
      values: product.references[key],
    }))
    .filter((group) => group.values.length > 0)
}

export interface VehicleFamily {
  make: string
  models: string[]
  products: { code: string; href: string }[]
}

export function getVehicleFamilies(
  locale: Locale = defaultLocale,
): VehicleFamily[] {
  const families = new Map<string, VehicleFamily>()
  for (const product of getProducts(locale)) {
    for (const vehicle of product.vehicles) {
      const family = families.get(vehicle.make) ?? {
        make: vehicle.make,
        models: [],
        products: [],
      }
      for (const model of vehicle.models) {
        if (!family.models.includes(model)) family.models.push(model)
      }
      if (!family.products.some((p) => p.code === product.code)) {
        family.products.push({ code: product.code, href: product.href })
      }
      families.set(vehicle.make, family)
    }
  }
  return Array.from(families.values())
}
