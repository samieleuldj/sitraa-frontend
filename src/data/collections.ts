export type CollectionId = 'hijabs' | 'sharia-hijabs' | 'abayas';

export type Collection = {
  id: CollectionId;
  nameAr: string;
  nameEn: string;
  description: string;
  shortDescription: string;
  href: string;
  coverImage: string;
  coverPosition?: string;
  comingSoon?: boolean;
  accent: string;
};

export const collections: Collection[] = [
  {
    id: 'sharia-hijabs',
    nameAr: 'حجابات شرعية',
    nameEn: 'Modest Hijabs',
    description: 'تغطية كاملة، خامات محتشمة، وتشطيب يليق باللباس الشرعي.',
    shortDescription: 'سترة، خمار، وتغطية كاملة بألوان أنيقة',
    href: '/collection/sharia-hijabs',
    coverImage: '/collections/sharia-hijabs.png',
    coverPosition: 'object-center',
    accent: 'from-nude/80 to-secondary',
  },
  {
    id: 'hijabs',
    nameAr: 'حجابات',
    nameEn: 'Hijabs',
    description: 'حجابات يومية — قماش ناعم، ثبات ممتاز، وستايلات عصرية.',
    shortDescription: 'كلاسيك، فولار، وألوان ترند للاستعمال اليومي',
    href: '/collection/hijabs',
    coverImage: '/collections/hijabs.png',
    coverPosition: 'object-center',
    accent: 'from-secondary to-cream',
  },
  {
    id: 'abayas',
    nameAr: 'عبايات',
    nameEn: 'Abayas',
    description: 'عبايات أنيقة بخياطة متقنة — قريباً في المتجر.',
    shortDescription: 'عبايات فاخرة — قريباً في Sitraa',
    href: '/collection/abayas',
    coverImage: '/collections/abayas.png',
    coverPosition: 'object-top',
    comingSoon: true,
    accent: 'from-primary/20 to-secondary',
  },
];
