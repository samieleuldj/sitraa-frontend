export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
  photo?: string;
  reviewImage?: string;
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
  images?: string[];
  problemText?: string;
  solutionText?: string;
  videoFile?: string;
  videoPoster?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  requiresSizeInfo?: boolean;
};

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
    sizes: ['Standard (180×70 cm)', 'Maxi (200×80 cm)'],
    fabricInfo:
      'قماش كريب جورجيت كوري أصلي — بارد، خفيف، مسامات تتنفس. ما يزلقش ولا يحتاج كي باستمرار.',
    careInstructions: 'غسل يدوي أو غسالة 30°C — تجفيف طبيعي.',
    weightG: 180,
    stitchNote: 'خياطة مخفية عند الحواف — finishing نظيف',
    features: [
      'قماش كوري أصلي — بارد ومسامات تتنفس',
      'فولار ثابت — ما يسلّكش بسهولة',
      'خياطة احترافية مخفية',
      'مقاسات Standard و Maxi — واضحة ومضبوطة',
      'استبدال ساهل إذا المقاس ما لبقاش',
    ],
    problemText:
      'حجاب يزلق، يخنق في الصيف، خياطة تبان رخيصة، أو مقاس ما يبانش online — وتندمي بعد ما تشري.',
    solutionText:
      'Sitraa: قماش فاخر، finishing متقن، مقاسات واضحة + استبدال. جودة تبان — حتى مامك تقول "هذا صح".',
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
