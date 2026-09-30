/** عروض إضافية لكل منتج — تقدري تبدّليها كي تزيدي منتج جديد */

export type BundleUpsell = {
  id: string;
  nameAr: string;
  standalonePrice: number;
  bundlePrice: number;
  pitchAr: string;
};

export type ProductUpsellConfig = {
  /** خصم على الوحدة الثانية (مثلاً 1000 دج) */
  secondUnitDiscount?: number;
  /** منتج يُقترَح مع الطلب (خمار، حجاب…) */
  bundle?: BundleUpsell;
  /** عرض الخروج: bundle = منتج إضافي | discount = خصم على المنتج الحالي */
  exitOffer?: {
    type: 'bundle' | 'discount';
    discountAmount?: number;
  };
};

export const BUNDLE_PREF_KEY = 'sitraa_bundle_pref';

export function bundlePrefKey(productId: string): string {
  return `${BUNDLE_PREF_KEY}_${productId}`;
};

export const productUpsells: Record<string, ProductUpsellConfig> = {
  'abaya-two-piece-sitraa': {
    secondUnitDiscount: 1000,
    bundle: {
      id: 'khimar-sitraa',
      nameAr: 'خمار Sitraa',
      standalonePrice: 900,
      bundlePrice: 500,
      pitchAr: 'كامل مع عبايتك — بلاصي 900 دج لوحدها',
    },
    exitOffer: { type: 'bundle' },
  },
  'hijab-classic': {
    secondUnitDiscount: 500,
    exitOffer: { type: 'discount', discountAmount: 200 },
  },
  'hijab-sharia-sitraa': {
    secondUnitDiscount: 500,
    exitOffer: { type: 'discount', discountAmount: 200 },
  },
};

export function getUpsellForProduct(productId: string): ProductUpsellConfig | undefined {
  return productUpsells[productId];
}
