export type CollectionId = 'hijabs' | 'sharia-hijabs' | 'abayas';

export type Collection = {
  id: CollectionId;
  nameAr: string;
  nameEn: string;
  description: string;
  shortDescription: string;
  href: string;
  coverImage: string;
  comingSoon?: boolean;
  accent: string;
};

export const collections: Collection[] = [
  {
    id: 'hijabs',
    nameAr: 'حجابات',
    nameEn: 'Hijabs',
    description: 'حجابات يومية — قماش ناعم، ثبات ممتاز، ومقاسات واضحة.',
    shortDescription: 'ستايلات يومية — كلاسيك، فولار، وألوان ترند',
    href: '/collection/hijabs',
    coverImage: '/brand/sitraa-cover.png',
    accent: 'from-secondary to-cream',
  },
  {
    id: 'sharia-hijabs',
    nameAr: 'حجابات شرعية',
    nameEn: 'Modest Hijabs',
    description: 'تغطية كاملة، خامات محتشمة، وتشطيب يليق باللباس الشرعي.',
    shortDescription: 'تغطية كاملة — سترة، شرشف، وموديلات محتشمة',
    href: '/collection/sharia-hijabs',
    coverImage: '/brand/sitraa-cover.png',
    accent: 'from-nude/80 to-secondary',
  },
  {
    id: 'abayas',
    nameAr: 'عبايات',
    nameEn: 'Abayas',
    description: 'قريباً — عبايات أنيقة بخياطة متقنة من Sitraa.',
    shortDescription: 'عبايات أنيقة — قريباً في المتجر',
    href: '/collection/abayas',
    coverImage: '/brand/sitraa-cover.png',
    comingSoon: true,
    accent: 'from-primary/20 to-secondary',
  },
];
