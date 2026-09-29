import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageContent from '@/components/product/ProductPageContent';
import { getProductById } from '@/data/products';
import { buildPageMetadata, siteConfig } from '@/lib/seo';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const base = getProductById(params.id);
  if (!base) {
    return { title: 'منتج غير موجود' };
  }

  const product = await getProductWithLivePrice(base);

  return buildPageMetadata({
    title: `${product.name} — ${product.price} دج | ${siteConfig.nameAr}`,
    description: product.description,
    path: `/product/${product.id}`,
    keywords: [product.name, siteConfig.nameAr, 'حجاب', 'دفع عند الاستلام'],
  });
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const base = getProductById(params.id);
  if (!base) notFound();

  const product = await getProductWithLivePrice(base);
  const reviews = product.reviews || [];

  return <ProductPageContent product={product} reviews={reviews} />;
}
