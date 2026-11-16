import type { Metadata } from 'next'
import { absoluteUrl, company, defaultOgImage } from '@/lib/site'

interface MetadataInput {
  title: string
  description: string
  path: string
  image?: { src: string; width: number; height: number; alt: string }
  type?: 'website' | 'article'
}

export function buildMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = 'website',
}: MetadataInput): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: company.legalName,
      type,
      locale: 'en_US',
      images: [
        {
          url: absoluteUrl(image.src),
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image.src)],
    },
  }
}
