import {
  DEFAULT_SIZE_VALUES,
  TAQM_AL_IFFA_SIZE_OPTIONS,
  TAQM_AL_IFFA_SIZE_VALUES,
  type SizeOption,
} from '@/data/sizes';

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
  productKind?: 'hijab' | 'abaya' | 'sharia-set';
  sizeOptions?: SizeOption[];
  finishingImages?: { src: string; label: string }[];
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
    image: '/products/abaya-two-piece/olive.webp',
  },
  {
    id: 'brown',
    nameAr: 'مارون',
    hex: '#4a3228',
    image: '/products/abaya-two-piece/brown.webp',
  },
  {
    id: 'black',
    nameAr: 'أسود',
    hex: '#1a1a1a',
    image: '/products/abaya-two-piece/black.webp',
  },
];

export const DEFAULT_SIZES = DEFAULT_SIZE_VALUES;

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
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_SIZES,
    colors: ABAYA_TWO_PIECE_COLORS,
    images: [
      '/products/abaya-two-piece/olive.webp',
      '/products/abaya-two-piece/brown.webp',
      '/products/abaya-two-piece/black.webp',
    ],
    fabricInfo:
      'قماش كريب فاخر — ناعم، خفيف، وما يتكشّرش. سقوط أنيق يبرز الستايل بدون ما يبان ثقيل.',
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
    id: 'ensemble-elegance-sitraa',
    collectionId: 'hijabs',
    productKind: 'abaya',
    name: 'طقم أناقة قطعتين — Sitraa',
    description:
      'طقم محتشم من قطعتين: بلوزة بأكمام balloon + تنورة واسعة بكسرات. خامة ناعمة، سقوط أنيق، وستايل عصري للخروج اليومي والمناسبات.',
    price: 3900,
    oldPrice: 5500,
    badge: 'جديد ✨',
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: DEFAULT_SIZES,
    colors: [
      {
        id: 'blue',
        nameAr: 'أزرق',
        hex: '#1e4d6b',
        image: '/products/ensemble-two-piece/blue.webp',
      },
      {
        id: 'black',
        nameAr: 'أسود',
        hex: '#1a1a1a',
        image: '/products/ensemble-two-piece/black.webp',
      },
      {
        id: 'beige',
        nameAr: 'بيج',
        hex: '#c9b59a',
        image: '/products/ensemble-two-piece/beige.webp',
      },
    ],
    images: [
      '/products/ensemble-two-piece/blue.webp',
      '/products/ensemble-two-piece/black.webp',
      '/products/ensemble-two-piece/beige.webp',
    ],
    fabricInfo:
      'كريب ناعم — خفيف، ما يتكشّرش، وما يلبسش الجسم. سقوط wide يعطي راحة ومحتشمة في نفس الوقت.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    stitchNote: 'أكمام مطاطية + رباطات — ستايل balloon أنيق',
    features: [
      'قطعتين متناسقتين — بلوزة + تنورة',
      'أكمام balloon برباطات عند المعصم',
      'تنورة واسعة بكسرات — راحة وحركة',
      '3 ألوان: أزرق، أسود، بيج',
      'مقاس 38–42 و 44–50',
      'مناسب للجامعة، الخروج، والمناسبات',
    ],
    problemText:
      'لبسة ضيقة، قماش رقيق، أو ستايل قديم — وتحسي ما تبانش أنيقة ولا مرتاحة.',
    solutionText:
      'Sitraa: طقم قطعتين بقماش ناعم، ستايل عصري، وألوان ترند. محتشمة وفي نفس الوقت أنيقة — تلبسيها بثقة.',
    finishingImages: [
      { src: '/products/ensemble-two-piece/blue.webp', label: 'أكمام balloon + رباطات' },
      { src: '/products/ensemble-two-piece/beige.webp', label: 'تنورة واسعة بكسرات' },
      { src: '/products/ensemble-two-piece/black.webp', label: 'ستايل كامل — أسود' },
    ],
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
    id: 'taqm-al-iffa-sitraa',
    collectionId: 'sharia-hijabs',
    productKind: 'sharia-set',
    name: 'طقم العفة — Sitraa',
    description:
      'طقم شرعي كامل 4 قطع: عباية + وشاح الغشوة + نقاب + قفازات. خامة كريب مطاطي — تغطية كاملة بدون شفافية، وألوان متناسقة من طقم واحد.',
    price: 5900,
    oldPrice: 7900,
    badge: 'الأكثر طلباً ✨',
    requiresSizeInfo: true,
    requiresColorInfo: true,
    sizes: TAQM_AL_IFFA_SIZE_VALUES,
    sizeOptions: TAQM_AL_IFFA_SIZE_OPTIONS,
    colors: [
      {
        id: 'navy',
        nameAr: 'أزرق',
        hex: '#1e3a5f',
        image: '/products/taqm-al-iffa/navy.webp',
      },
      {
        id: 'black',
        nameAr: 'أسود',
        hex: '#1a1a1a',
        image: '/products/taqm-al-iffa/black.webp',
      },
    ],
    images: [
      '/products/taqm-al-iffa/navy.webp',
      '/products/taqm-al-iffa/black.webp',
    ],
    fabricInfo:
      'كريب مطاطي فاخر — opaque 100%، ما يبانش تحتيه، وخفيف في نفس الوقت. مناسب للصيف والشتاء.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي — ما تكيّيش بحرارة عالية.',
    stitchNote: 'أكمام مطاطية عند المعصم — سهلة للوضوء وما تنزلش',
    features: [
      '4 قطع متناسقة — عباية + غشوة + نقاب + قفازات',
      'تغطية كاملة — بدون شفافية',
      'غشوة طويلة بطبقات — ما تتحركش بسهولة',
      '3 مقاسات: 38–42 · 44–48 · 50–56',
      'لونين: أزرق وأسود',
      'نتصلو بيك للتأكيد قبل الإرسال',
    ],
    problemText:
      'تشري قطعة قطعة واللون ما يطابقش، أو القماش شفاف، أو النقاب يضايق، أو المقاس يجي غلط online — وتندمي.',
    solutionText:
      'Sitraa طقم العفة: 4 قطع بنفس اللون والخامة، تغطية محتشمة، مقاسات واضحة، واستبدال إذا ما لبقاش. جودة تبان — حتى مامك تقول «هذا صح».',
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
