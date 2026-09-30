export const storeBrand = {

  name: 'Sitraa',

  nameAr: 'سِتْرة',

  tagline: 'HIJAB & SCARVES',

  taglineAr: 'أناقتك … بطريقتك',

  description:

    'متجر جزائري للحجابات — قماش فاخر وخياطة متقنة.',

  descriptionLine2: 'الدفع عند الاستلام · توصيل 58 ولاية.',

  logoSrc: '/brand/sitraa-logo.png',

  coverSrc: '/brand/sitraa-cover.png',

  email: '',

  accentClass: 'text-accent',

  primaryProductId: 'abaya-two-piece-sitraa',

};



export function getSiteDisplayUrl(): string {

  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://sitraa.shop';

  try {

    return new URL(url).hostname;

  } catch {

    return 'sitraa.shop';

  }

}

