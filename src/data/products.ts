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
  image?: string;
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
  productKind?: 'hijab' | 'abaya';
};

export const DEFAULT_HIJAB_COLORS: ProductColor[] = [
  { id: 'black', nameAr: 'أسود', hex: '#1a1a1a' },
  { id: 'beige', nameAr: 'بيج', hex: '#c9a882' },
  { id: 'mauve', nameAr: 'موف', hex: '#9b7b8e' },
  { id: 'navy', nameAr: 'كحلي', hex: '#3d4f5f' },
  { id: 'cream', nameAr: 'كريمي', hex: '#f0e6d8' },
];

export const ABAYA_TWO_PIECE_COLORS: ProductColor[] = [
  {
    id: 'olive',
    nameAr: 'زيتي',
    hex: '#4a5240',
    image: '/products/abaya-two-piece/olive.png',
  },
  {
    id: 'brown',
    nameAr: 'مارون',
    hex: '#4a3228',
    image: '/products/abaya-two-piece/brown.png',
  },
  {
    id: 'black',
    nameAr: 'أسود',
    hex: '#1a1a1a',
    image: '/products/abaya-two-piece/black.png',
  },
];

export const DEFAULT_SIZES = ['38 – 42', '44 – 50'];

export const products: Product[] = [
  {
    id: 'abaya-two-piece-sitraa',
    collectionId: 'abayas',
    productKind: 'abaya',
    name: 'طقم عباية قطعتين — Sitraa',
    description:
      'عباية أنيقة من قطعتين: فستان داخلي + درّاعة مفتوحة بأكمام واسعة. خامة ناعمة، ستايل عصري، ومناسبة للمناسبات والخروج اليومي.',
    price: 5900,
    oldPrice: 7500,
    badge: 'جديد ✨',
    rating: 4.9,
    reviewCount: 36,
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_SIZES,
    colors: ABAYA_TWO_PIECE_COLORS,
    images: [
      '/products/abaya-two-piece/olive.png',
      '/products/abaya-two-piece/brown.png',
      '/products/abaya-two-piece/black.png',
    ],
    fabricInfo:
      'قماش كريب فاخر — ناعم، خفيف، وما يتكشّرش. دrape أنيق يبرز الستايل بدون ما يبان ثقيل.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي — كي على درجة منخفضة.',
    stitchNote: 'خياطة متقنة — درّاعة + فستان منسقين',
    features: [
      'طقم قطعتين — فستان + درّاعة مفتوحة',
      'أكمام واسعة — ستايل butterfly أنيق',
      '3 ألوان: زيتي، مارون، أسود',
      'مقاس 38–42 و 44–50',
      'مناسبة للمناسبات والخروج اليومي',
    ],
    problemText:
      'عباية رخيصة، قماش رقيق، أو مقاس ما يلبقش — وتندمي بعد ما تشري online.',
    solutionText:
      'Sitraa: طقم قطعتين بجودة واضحة، ألوان أنيقة، ومقاسات 38–42 و 44–50. نتصلو بيك للتأكيد قبل الإرسال.',
    reviews: [],
  },
  {
    id: 'hijab-classic',
    collectionId: 'hijabs',
    productKind: 'hijab',
    name: 'حجاب كلاسيك بريميوم — Sitraa',
    description:
      'حجاب مصمم للمرأة الجزائرية — قماش فاخر، خياطة متقنة، ومقاسات واضحة. جودة تبان من أول لمسة.',
    price: 2500,
    oldPrice: 3500,
    badge: 'الأكثر مبيعاً ✨',
    rating: 4.9,
    reviewCount: 124,
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_SIZES,
    colors: DEFAULT_HIJAB_COLORS,
    fabricInfo:
      'قماش كريب جورجيت — بارد، خفيف، مسامات تتنفس. ما يزلقش ولا يحتاج كي باستمرار.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    weightG: 180,
    stitchNote: 'خياطة مخفية عند الحواف — تشطيب نظيف',
    features: [
      'قماش فاخر — بارد ومسامات تتنفس',
      'فولار ثابت — ما يسلّكش بسهولة',
      'خياطة احترافية مخفية',
      'مقاس 38–42 و 44–50',
      'ألوان الأكثر طلباً',
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
    productKind: 'hijab',
    name: 'حجاب سترة شرعي — Sitraa',
    description:
      'حجاب شرعي بتغطية كاملة — خامة محتشمة، فولار ثابت، ومقاسات 38–42 و 44–50.',
    price: 2800,
    oldPrice: 3800,
    rating: 4.9,
    reviewCount: 48,
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_SIZES,
    colors: DEFAULT_HIJAB_COLORS,
    fabricInfo: 'قماش فاخر — تغطية كاملة بدون شفافية.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    features: [
      'تغطية شرعية كاملة',
      'فولار ثابت — ما يتحركش',
      'مقاسات 38–42 و 44–50',
      'ألوان محتشمة',
    ],
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
