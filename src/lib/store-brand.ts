export const storeBrand = {
  name: 'Sitraa',
  nameAr: 'سِتْرة',
  tagline: 'SOFT MODEST FASHION',
  taglineAr: 'حجابات بجودة تليق بيك',
  description:
    'متجر جزائري للحجابات — قماش فاخر، خياطة متقنة، ومقاسات مدروسة. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
  email: '',
  accentClass: 'text-accent',
  primaryProductId: 'hijab-classic',
};

export function getSiteDisplayUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://sitraa.shop';
  try {
    return new URL(url).hostname;
  } catch {
    return 'sitraa.shop';
  }
}
