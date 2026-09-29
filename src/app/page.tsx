import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageContent from '@/components/product/ProductPageContent';
import { products } from '@/data/products';
import { buildPageMetadata } from '@/lib/seo';
import { storeBrand } from '@/lib/store-brand';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

const FEATURED_ID = storeBrand.primaryProductId;

export async function generateMetadata(): Promise<Metadata> {
  const base = products.find((p) => p.id === FEATURED_ID);
  if (!base) {
    return { title: storeBrand.nameAr };
  }

  const product = await getProductWithLivePrice(base);

  return buildPageMetadata({
    title: `${product.name} — ${product.price} دج | ${storeBrand.nameAr}`,
    description: product.description,
    path: '/',
    keywords: [product.name, storeBrand.nameAr, 'حجاب', 'دفع عند الاستلام'],
  });
}

export default async function HomePage() {
  const base = products.find((p) => p.id === FEATURED_ID);
  if (!base) notFound();

  const product = await getProductWithLivePrice(base);
  const reviews = product.reviews || [];

  return (
    <ProductPageContent
      product={product}
      reviews={reviews}
      hideBreadcrumb
    />
  );
}
