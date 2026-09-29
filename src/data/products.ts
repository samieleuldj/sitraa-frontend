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
  requiresVehicleInfo?: boolean;
};

export const products: Product[] = [
  {
    id: 'hijab-classic',
    name: 'حجاب كلاسيك — Sitraa',
    description:
      'حجاب ناعم ومريح للاستعمال اليومي. خامة خفيفة، ثبات ممتاز، وألوان أنيقة. توصيل لكل الولايات — الدفع عند الاستلام.',
    price: 2500,
    oldPrice: 3200,
    badge: 'جديد ✨',
    rating: 4.9,
    reviewCount: 0,
    requiresVehicleInfo: false,
    features: [
      'خامة ناعمة ومريحة طوال اليوم',
      'ثبات ممتاز — ما يسلّكش بسهولة',
      'مناسب للاستعمال اليومي والمناسبات',
      'توصيل 58 ولاية — الدفع عند الاستلام',
      'استبدال ساهل إذا في مشكل في المقاس',
    ],
    problemText:
      'حجاب ما يريحش، يسلّك كل شوي، أو خامة رقيقة ما تدومش — تعب يومي مع كل خروجة.',
    solutionText:
      'حجاب Sitraa مصمم للراحة والثبات — خامة quality، cut أنيق، ويناسب الحياة اليومية في الجزائر.',
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
