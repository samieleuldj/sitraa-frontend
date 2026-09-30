'use client';

import LandingHeader from '@/components/layout/LandingHeader';
import LandingFooter from '@/components/layout/LandingFooter';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main className="flex-grow">{children}</main>
      <LandingFooter />
      <WhatsAppFloat />
    </>
  );
}
