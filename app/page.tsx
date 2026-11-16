import { HeroCarousel } from '@/components/home/hero-carousel'
import {
  ApplicationsSection,
  CompanySection,
  DeliverySection,
  FinderSection,
  ManufacturingSection,
  PrecisionSection,
  QualitySection,
  RfqSection,
  ToolingSection,
} from '@/components/home/home-sections'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata = buildMetadata({
  title: 'Brake Pad Backing Plates and Metal Stamping Parts | Ningbo Yuanjing',
  description:
    'Search steel brake pad backing plates by FMSI, OE, WVA and TRW reference. Drawing-based mold development, sampling and OEM/ODM production from Ningbo, China.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <FinderSection />
      <ApplicationsSection />
      <PrecisionSection />
      <ManufacturingSection />
      <ToolingSection />
      <QualitySection />
      <DeliverySection />
      <CompanySection />
      <RfqSection />
    </>
  )
}
