'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { products } from '@/data/products';

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const productMatch = pathname.match(/^\/product\/([^/]+)$/);
    if (productMatch) {
      const product = products.find((item) => item.id === productMatch[1]);
      trackEvent('product_view', {
        page_path: pathname,
        product_id: productMatch[1],
        product_name: product?.name,
      });
      return;
    }

    trackEvent('page_view', { page_path: pathname || '/' });
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsTracker() {
  return <AnalyticsTrackerInner />;
}
