export const storeBrand = {
  name: 'Sitraa',
  nameAr: 'سِتْرة',
  tagline: 'MODEST FASHION',
  taglineAr: 'حجابات وأناقة محتشمة',
  description:
    'متجر جزائري للحجابات — جودة، راحة، وأناقة. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
  email: '',
  accentClass: 'text-rose-400',
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
