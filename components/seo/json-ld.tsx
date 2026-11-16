import type { ArticleView } from '@/lib/data/news'
import { referenceGroups, type ProductView } from '@/lib/data/products'
import { absoluteUrl, company, fullAddress, siteUrl } from '@/lib/site'

type JsonLdData = Record<string, unknown>

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

export function organizationJsonLd(): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: company.legalName,
    alternateName: company.chineseName,
    url: siteUrl,
    logo: absoluteUrl(company.logo.src),
    foundingDate: String(company.founded),
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    description:
      'Manufacturer of automotive brake pad backing plates and custom metal stamping parts in Ningbo, China.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: company.email,
      telephone: company.phone,
      availableLanguage: ['English'],
    },
  }
}

export function websiteJsonLd(): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: company.legalName,
    inLanguage: 'en',
    publisher: { '@id': `${siteUrl}/#organization` },
  }
}

export function productJsonLd(product: ProductView): JsonLdData {
  const properties = [
    { name: 'Overall dimensions', value: product.dimensions },
    ...referenceGroups(product).map((group) => ({
      name: `${group.label} reference`,
      value: group.values.join(', '),
    })),
    { name: 'Vehicle fitment', value: product.fitmentSummary },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.code,
    mpn: product.code,
    description: product.summary,
    category: 'Brake pad backing plates',
    material: product.material,
    image: absoluteUrl(product.image.src),
    url: absoluteUrl(product.href),
    brand: { '@type': 'Organization', name: company.legalName },
    manufacturer: { '@id': `${siteUrl}/#organization` },
    additionalProperty: properties.map((p) => ({
      '@type': 'PropertyValue',
      name: p.name,
      value: p.value,
    })),
  }
}

export function articleJsonLd(article: ArticleView): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: absoluteUrl(article.href),
    image: article.image ? absoluteUrl(article.image.src) : undefined,
    author: { '@type': 'Organization', name: company.legalName },
    publisher: {
      '@type': 'Organization',
      name: company.legalName,
      logo: { '@type': 'ImageObject', url: absoluteUrl(company.logo.src) },
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export const addressLine = fullAddress
