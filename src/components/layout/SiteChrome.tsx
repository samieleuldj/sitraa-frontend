'use client';

import LandingHeader from '@/components/layout/LandingHeader';
import LandingFooter from '@/components/layout/LandingFooter';

/** Single-product landing (AUTO PLUS / موكات) — no Confort store navigation. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main className="flex-grow">{children}</main>
      <LandingFooter />
    </>
  );
}
