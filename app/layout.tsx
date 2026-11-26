import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Newsreader } from 'next/font/google'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/components/seo/json-ld'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { company, siteUrl } from '@/lib/site'
import './globals.css'

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  display: 'swap',
})

const description =
  'Ningbo Yuanjing manufactures steel brake pad backing plates and custom metal stamping parts. Search models by FMSI, OE, WVA and TRW references, review dimensions and fitment, and request a quote.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Brake Pad Backing Plates | ${company.legalName}`,
    template: `%s | Yuanjing Automotive Parts`,
  },
  description,
  applicationName: company.legalName,
  openGraph: {
    type: 'website',
    siteName: company.legalName,
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#f7f4ec',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${newsreader.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-yj-blue focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || "afb1a468-b7cf-4902-beb4-d02e66974e25")}`}
        />
      </body>
    </html>
  )
}
