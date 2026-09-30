export type Collection = {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  href: string;
  comingSoon?: boolean;
  accent: string;
};

export const collections: Collection[] = [
  {
    id: 'hijabs',
    nameAr: 'حجابات',
    nameEn: 'Hijabs',
    description: 'حجابات يومية — قماش ناعم، ثبات ممتاز، ومقاسات واضحة.',
    href: '/product/hijab-classic',
    accent: 'from-secondary to-cream',
  },
  {
    id: 'sharia-hijabs',
    nameAr: 'حجابات شرعية',
    nameEn: 'Modest Hijabs',
    description: 'تغطية كاملة، خامات محتشمة، وتشطيب يليق باللباس الشرعي.',
    href: '/product/hijab-classic',
    accent: 'from-nude/80 to-secondary',
  },
  {
    id: 'abayas',
    nameAr: 'عبايات',
    nameEn: 'Abayas',
    description: 'قريباً — عبايات أنيقة بخياطة متقنة من Sitraa.',
    href: '#collections',
    comingSoon: true,
    accent: 'from-primary/20 to-secondary',
  },
];
