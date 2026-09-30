export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
  photo?: string;
  reviewImage?: string;
};

export type ProductColor = {
  id: string;
  nameAr: string;
  hex: string;
};

export type Product = {
  id: string;
  collectionId?: 'hijabs' | 'sharia-hijabs' | 'abayas';
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  features: string[];
  fabricInfo?: string;
  careInstructions?: string;
  weightG?: number;
  stitchNote?: string;
  sizes?: string[];
  colors?: ProductColor[];
  images?: string[];
  problemText?: string;
  solutionText?: string;
  videoFile?: string;
  videoPoster?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  requiresSizeInfo?: boolean;
  requiresColorInfo?: boolean;
};

export const DEFAULT_HIJAB_COLORS: ProductColor[] = [
  { id: 'black', nameAr: 'أسود', hex: '#1a1a1a' },
  { id: 'beige', nameAr: 'بيج', hex: '#c9a882' },
  { id: 'mauve', nameAr: 'موف', hex: '#9b7b8e' },
  { id: 'navy', nameAr: 'كحلي', hex: '#3d4f5f' },
  { id: 'cream', nameAr: 'كريمي', hex: '#f0e6d8' },
];

export const DEFAULT_HIJAB_SIZES = ['38 – 42', '44 – 50'];

export const products: Product[] = [
  {
    id: 'hijab-classic',
    collectionId: 'hijabs',
    name: 'حجاب كلاسيك بريميوم — Sitraa',
    description:
      'حجاب مصمم للمرأة الجزائرية — قماش كوري أصلي، خياطة متقنة، ومقاسات واضحة. جودة تبان من أول لمسة.',
    price: 2500,
    oldPrice: 3500,
    badge: 'الأكثر مبيعاً ✨',
    rating: 4.9,
    reviewCount: 124,
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_HIJAB_SIZES,
    colors: DEFAULT_HIJAB_COLORS,
    fabricInfo:
      'قماش كريب جورجيت كوري أصلي — بارد، خفيف، مسامات تتنفس. ما يزلقش ولا يحتاج كي باستمرار.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    weightG: 180,
    stitchNote: 'خياطة مخفية عند الحواف — تشطيب نظيف',
    features: [
      'قماش كوري أصلي — بارد ومسامات تتنفس',
      'فولار ثابت — ما يسلّكش بسهولة',
      'خياطة احترافية مخفية',
      'مقاس 38–42 و 44–50 — واضحة ومضبوطة',
      'ألوان الأكثر طلباً — أسود، بيج، موف…',
    ],
    problemText:
      'حجاب يزلق، يخنق في الصيف، خياطة تبان رخيصة، أو مقاس ما يبانش online — وتندمي بعد ما تشري.',
    solutionText:
      'Sitraa: قماش فاخر، تشطيب متقن، مقاسات واضحة + استبدال. جودة تبان — حتى مامك تقول "هذا صح".',
    reviews: [],
  },
  {
    id: 'hijab-sharia-sitraa',
    collectionId: 'sharia-hijabs',
    name: 'حجاب سترة شرعي — Sitraa',
    description:
      'حجاب شرعي بتغطية كاملة — خامة محتشمة، فولار ثابت، ومقاسات 38–42 و 44–50.',
    price: 2800,
    oldPrice: 3800,
    badge: 'جديد ✨',
    rating: 4.9,
    reviewCount: 48,
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_HIJAB_SIZES,
    colors: DEFAULT_HIJAB_COLORS,
    fabricInfo: 'قماش كوري — تغطية كاملة بدون شفافية.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    features: [
      'تغطية شرعية كاملة',
      'فولار ثابت — ما يتحركش',
      'مقاسات 38–42 و 44–50',
      'ألوان محتشمة — أسود، كحلي، موف…',
    ],
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
