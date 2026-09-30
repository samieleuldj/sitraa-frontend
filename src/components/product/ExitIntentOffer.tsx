'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductUpsellConfig } from '@/data/upsells';
import { bundlePrefKey } from '@/data/upsells';
import {
  markExitOfferShown,
  storeDiscount,
  wasExitOfferShown,
} from '@/lib/product-discount';

type ExitIntentOfferProps = {
  productId: string;
  productName: string;
  basePrice: number;
  upsell?: ProductUpsellConfig;
};

const MIN_PAGE_MS = 8000;
const MIN_FORM_DWELL_MS = 3000;

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(max-width: 768px)').matches
  );
}

function trapHistory(): void {
  try {
    window.history.pushState({ sitraaExitTrap: Date.now() }, '', window.location.href);
  } catch {
    // in-app browsers
  }
}

export default function ExitIntentOffer({
  productId,
  productName,
  basePrice,
  upsell,
}: ExitIntentOfferProps) {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const pageStartRef = useRef(Date.now());
  const formFocusSinceRef = useRef<number | null>(null);
  const trapArmedRef = useRef(false);

  const exitType = upsell?.exitOffer?.type ?? 'discount';
  const bundle = upsell?.bundle;
  const discountAmount = upsell?.exitOffer?.discountAmount ?? 200;
  const isBundleExit = exitType === 'bundle' && bundle;
  const salePrice = basePrice - discountAmount;

  const canOffer = useCallback(() => {
    if (Date.now() - pageStartRef.current < MIN_PAGE_MS) return false;
    if (formFocusSinceRef.current === null) return false;
    return Date.now() - formFocusSinceRef.current >= MIN_FORM_DWELL_MS;
  }, []);

  const armTrapIfReady = useCallback(() => {
    if (trapArmedRef.current || !canOffer()) return;
    trapArmedRef.current = true;
    trapHistory();
    trapHistory();
  }, [canOffer]);

  const showOnce = useCallback(() => {
    if (shownRef.current || wasExitOfferShown(productId)) return;
    if (!canOffer()) return;
    shownRef.current = true;
    markExitOfferShown(productId);
    setOpen(true);
  }, [productId, canOffer]);

  useEffect(() => {
    if (wasExitOfferShown(productId)) return;

    pageStartRef.current = Date.now();
    const form = document.getElementById('order-form');

    const onFormFocusIn = () => {
      if (formFocusSinceRef.current === null) {
        formFocusSinceRef.current = Date.now();
      }
      window.setTimeout(armTrapIfReady, MIN_FORM_DWELL_MS + 50);
    };

    const onPopState = () => {
      if (!canOffer()) {
        if (trapArmedRef.current) trapHistory();
        return;
      }
      showOnce();
      trapHistory();
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (isTouchDevice()) return;
      if (event.clientY > 8) return;
      if (!canOffer()) return;
      armTrapIfReady();
      showOnce();
    };

    form?.addEventListener('focusin', onFormFocusIn);
    window.addEventListener('popstate', onPopState);
    if (!isTouchDevice()) {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      form?.removeEventListener('focusin', onFormFocusIn);
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [productId, showOnce, armTrapIfReady, canOffer]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const scrollToForm = () => {
    const form = document.getElementById('order-form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const acceptBundle = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(bundlePrefKey(productId), '1');
      window.dispatchEvent(
        new CustomEvent('sitraa-bundle-pref', { detail: { productId } }),
      );
    }
    setOpen(false);
    scrollToForm();
  };

  const acceptDiscount = () => {
    storeDiscount(productId, discountAmount);
    setOpen(false);
    scrollToForm();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-l from-primary to-accent px-6 py-5 text-white text-center">
          <div className="text-3xl mb-2">🎁</div>
          <h2 className="text-xl font-black">ستني! عرض قبل ما تخرجي</h2>
          <p className="text-sm text-white/90 mt-1">مرة وحدة — ما تتكررش</p>
        </div>

        <div className="p-6 text-center">
          {isBundleExit && bundle ? (
            <>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                مع <span className="font-bold text-text">{productName}</span> — زيدي{' '}
                <span className="font-bold text-text">{bundle.nameAr}</span> بثمن ما يتعوضش
              </p>
              <div className="bg-secondary/40 border border-secondary rounded-2xl p-4 mb-5">
                <div className="text-sm text-gray-500 line-through">{bundle.standalonePrice} دج</div>
                <div className="text-3xl font-black text-primary">{bundle.bundlePrice} دج</div>
                <div className="text-xs font-bold text-accent mt-1">مع طلبك — الدفع كي توصلك</div>
              </div>
              <button
                type="button"
                onClick={acceptBundle}
                className="w-full bg-accent active:bg-primary text-white font-black text-lg py-4 rounded-xl shadow-lg mb-3"
              >
                نعم — زيدي {bundle.nameAr} ب {bundle.bundlePrice} دج
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                خصم خاص على <span className="font-bold text-text">{productName}</span>
              </p>
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-5">
                <div className="text-sm text-gray-500 line-through">{basePrice} دج</div>
                <div className="text-3xl font-black text-primary">{salePrice} دج</div>
                <div className="text-sm font-bold text-green-700 mt-1">
                  توفّري {discountAmount} دج — COD
                </div>
              </div>
              <button
                type="button"
                onClick={acceptDiscount}
                className="w-full bg-accent active:bg-primary text-white font-black text-lg py-4 rounded-xl shadow-lg mb-3"
              >
                استعملي الخصم وأكملي الطلب
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-gray-400 text-sm py-2"
          >
            لا شكراً
          </button>
        </div>
      </div>
    </div>
  );
}
