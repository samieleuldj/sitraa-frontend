'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { storeBrand } from '@/lib/store-brand';

export default function LandingHeader() {
  const pathname = usePathname();
  const productMatch = pathname?.match(/^\/product\/([^/]+)$/);
  const orderHref = productMatch
    ? `${pathname}#order-form`
    : `/product/${storeBrand.primaryProductId}#order-form`;

  return (
    <header className="bg-cream/95 backdrop-blur-md border-b border-secondary sticky top-0 z-50">
      <div className="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src={storeBrand.logoSrc}
            alt={storeBrand.nameAr}
            width={72}
            height={72}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <Link
          href={orderHref}
          className="bg-accent active:bg-primary text-white px-4 py-2 rounded-full font-black text-sm transition-all shadow-sm shrink-0"
        >
          اطلبي الآن
        </Link>
      </div>
    </header>
  );
}
