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
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  features: string[];
  fabricInfo?: string;
  careInstructions?: string;
  sizes?: string[];
  images?: string[];
  beforeImage?: string;
  afterImage?: string;
  problemText?: string;
  solutionText?: string;
  usageSteps?: string[];
  usageTitle?: string;
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
    name: 'حجاب كلاسيك بريميوم — Sitraa',
    description:
      'حجاب مصمم خصيصاً للمرأة الجزائرية. قماش حريري بارد ما يزلقش، خياطة مخفية ومتقنة تعكس احترافية البراند. القياس مدروس ليغطي الأكتاف براحة تامة.',
    price: 2500,
    oldPrice: 3500,
    badge: 'الأكثر مبيعاً ✨',
    rating: 4.9,
    reviewCount: 124,
    requiresSizeInfo: true,
    sizes: ['Standard (180x70 cm)', 'Maxi (200x80 cm)'],
    fabricInfo: 'قماش كريب جورجيت كوري أصلي — بارد، خفيف، ولا يحتاج للكي باستمرار.',
    careInstructions: 'يُغسل يدوياً أو في الغسالة بدرجة حرارة منخفضة (30°C).',
    features: [
      'قماش كوري أصلي: بارد ومسامات تتنفس طوال اليوم',
      'فولار ثابت: ما يسلّكش وما يزلقش بسهولة',
      'خياطة احترافية مخفية عند الأطراف',
      'مقاسات مضبوطة لتغطية كاملة ومريحة',
      'ضمان استبدال: إذا ما عجباتكش الكاليتي نبدلوهالك'
    ],
    problemText:
      'تعبتي من الحجابات اللي قماشها يزلق، تخنق في الصيف، أو خياطتها تبان رخيصة وتتنسل بالخف؟ يخسرو مور غسلة ولا زوج؟',
    solutionText:
      'حجاب Sitraa يجمع بين الفخامة والراحة. قماش كوري أصلي يخليك تحسي بالبرودة، مع فينيسيو (Finishing) متقنة تخلي حجابك يبان غالي ومميز.',
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
