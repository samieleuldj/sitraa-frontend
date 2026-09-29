import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Cairo } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/layout/SiteChrome';
import MetaPixel from '@/components/layout/MetaPixel';
import TrackingPixels from '@/components/layout/TrackingPixels';
import AnalyticsTracker from '@/components/layout/AnalyticsTracker';
import LiveStorefrontPrices from '@/components/product/LiveStorefrontPrices';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildPageMetadata,
  getSiteUrl,
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from '@/lib/seo';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...buildPageMetadata({
    title: `${siteConfig.nameAr} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    path: '/',
  }),
  title: {
    default: `${siteConfig.nameAr} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.nameAr}`,
  },
  applicationName: siteConfig.nameAr,
  authors: [{ name: siteConfig.nameAr, url: getSiteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.nameAr,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.className} flex flex-col min-h-screen`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <MetaPixel />
        <TrackingPixels />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <LiveStorefrontPrices />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
