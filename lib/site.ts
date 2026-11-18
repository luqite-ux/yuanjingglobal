export const company = {
  legalName: 'NINGBO YUANJING AUTOMOTIVE PARTS CO., LTD.',
  shortName: 'Yuanjing',
  founded: 2017,
  email: 'info@yuanjingglobal.com',
  phone: '+86 133 5599 5506',
  phoneHref: 'tel:+8613355995506',
  address: {
    street:
      'Building 24, Yida Science and Innovation City, Binhai Development Zone, Chunhu',
    locality: 'Fenghua, Ningbo',
    region: 'Zhejiang',
    country: 'China',
    countryCode: 'CN',
  },
  logo: {
    src: '/images/brand/yuanjing-logo.png',
    width: 1254,
    height: 1254,
  },
} as const

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.region}, ${company.address.country}`

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yuanjingglobal.com'
).replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About Us' },
  { href: '/news', label: 'News' },
] as const

export const quoteLink = { href: '/contact', label: 'Request a Quote' } as const

export const defaultOgImage = {
  src: '/images/hero/hero-model-discovery.jpg',
  width: 3840,
  height: 1600,
  alt: 'Rows of steel brake pad backing plates on a brushed metal surface',
}
