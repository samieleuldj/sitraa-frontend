import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sitraa',
  nameAr: 'سِتْرة',
  tagline: 'حجابات وأناقة محتشمة في الجزائر',
  description:
    'Sitraa — متجر حجابات جزائري. جودة، راحة، وتوصيل 58 ولاية. الدفع عند الاستلام.',
  locale: 'ar_DZ',
  keywords: [
    'حجاب',
    'حجابات',
    'حجاب جزائري',
    'Sitraa',
    'سitraa',
    'دفع عند الاستلام',
    'توصيل 58 ولاية',
    'modest fashion',
  ],
  defaultOgImage: '/og/sitraa-placeholder.png',
};

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://sitraa.shop';
  return url.replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path) return base;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(options.path || '/');
  const image = options.image ? absoluteUrl(options.image) : absoluteUrl(siteConfig.defaultOgImage);

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords || siteConfig.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: siteConfig.nameAr,
      locale: siteConfig.locale,
      type: 'website',
      images: [{ url: image, alt: options.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [image],
    },
    ...(options.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.nameAr,
    alternateName: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.nameAr,
    url: getSiteUrl(),
    description: siteConfig.description,
    inLanguage: 'ar-DZ',
  };
}

export function productJsonLd(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: (product.images || []).map((img) => absoluteUrl(img)),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'DZD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/product/${product.id}`),
    },
  };
}
