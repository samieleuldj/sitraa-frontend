import type { Metadata } from 'next';
import BrandHome from '@/components/home/BrandHome';
import { products } from '@/data/products';
import { buildPageMetadata } from '@/lib/seo';
import { storeBrand } from '@/lib/store-brand';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: `${storeBrand.nameAr} | ${storeBrand.taglineAr}`,
    description: storeBrand.description,
    path: '/',
    keywords: ['حجاب', 'حجابات', 'عبايات', 'Sitraa', 'سِتْرة', 'دفع عند الاستلام'],
  });
}

export default async function HomePage() {
  const liveProducts = await Promise.all(products.map((p) => getProductWithLivePrice(p)));

  return <BrandHome products={liveProducts} />;
}
