'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EXIT_DISCOUNT_DZD,
  markExitOfferShown,
  storeDiscount,
  wasExitOfferShown,
} from '@/lib/product-discount';

type ExitIntentOfferProps = {
  productId: string;
  productName: string;
  basePrice: number;
  discount?: number;
};

/** Ignore spurious popstate right after load (in-app browsers). */
const MIN_PAGE_MS = 8000;
/** Must interact with checkout before any offer can appear. */
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
    window.history.pushState({ cdzExitTrap: Date.now() }, '', window.location.href);
  } catch {
    // بعض متصفحات in-app تمنع pushState
  }
}

export default function ExitIntentOffer({
  productId,
  productName,
  basePrice,
  discount = EXIT_DISCOUNT_DZD,
}: ExitIntentOfferProps) {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const pageStartRef = useRef(Date.now());
  const formFocusSinceRef = useRef<number | null>(null);
  const trapArmedRef = useRef(false);
  const salePrice = basePrice - discount;

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

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && trapArmedRef.current) {
        trapHistory();
      }
    };

    form?.addEventListener('focusin', onFormFocusIn);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);

    if (!isTouchDevice()) {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      form?.removeEventListener('focusin', onFormFocusIn);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
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

  const acceptOffer = () => {
    storeDiscount(productId, discount);
    setOpen(false);
    const form = document.getElementById('order-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeOffer = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60"
      onClick={closeOffer}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-offer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-l from-accent to-orange-500 px-6 py-5 text-white text-center">
          <div className="text-3xl mb-2">🎁</div>
          <h2 id="exit-offer-title" className="text-xl font-black">
            قبل ما تخرجي... عرض خاص!
          </h2>
          <p className="text-sm text-white/90 mt-1">مرة واحدة فقط — اليوم</p>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-600 leading-relaxed mb-4">
            حبينا نسهّلو عليكِ الطلب على{' '}
            <span className="font-bold text-gray-800">{productName}</span>
          </p>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-5">
            <div className="text-sm text-gray-500 line-through">{basePrice} دج</div>
            <div className="text-3xl font-black text-primary">{salePrice} دج</div>
            <div className="text-sm font-bold text-green-700 mt-1">
              خصم {discount} دج — الدفع عند الاستلام
            </div>
          </div>

          <button
            type="button"
            onClick={acceptOffer}
            className="w-full bg-accent hover:bg-accent/90 text-white font-black text-lg py-4 rounded-xl shadow-lg mb-3"
          >
            استعملي الخصم وأطلبي الآن
          </button>

          <button
            type="button"
            onClick={closeOffer}
            className="w-full text-gray-400 text-sm py-2 hover:text-gray-600"
          >
            لا شكراً
          </button>
        </div>
      </div>
    </div>
  );
}
