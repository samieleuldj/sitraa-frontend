'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function PixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // تتبع PageView في كل مرة يتغير فيها الرابط
    if (typeof window !== 'undefined') {
      // Meta Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
      // TikTok Pixel
      if (window.ttq) {
        window.ttq.page();
      }
      // Snap Pixel
      if (window.snaptr) {
        window.snaptr('track', 'PAGE_VIEW');
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export default function TrackingPixels() {
  const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const SNAP_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  return (
    <>
      <Suspense fallback={null}>
        <PixelEvents />
      </Suspense>

      {/* Meta Pixel loads from MetaPixel.tsx (server runtime env) */}

      {/* TikTok Pixel Code */}
      {TIKTOK_ID && TIKTOK_ID !== 'your_tiktok_pixel_id' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${TIKTOK_ID}');
              }(window, document, 'ttq');
            `,
          }}
        />
      )}

      {/* Snapchat Pixel Code */}
      {SNAP_ID && SNAP_ID !== 'your_snap_pixel_id' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');
              snaptr('init', '${SNAP_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
