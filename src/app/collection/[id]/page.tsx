import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionPageContent from '@/components/collection/CollectionPageContent';
import { getCollectionById, getProductsByCollection } from '@/lib/collections';
import { buildPageMetadata } from '@/lib/seo';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const collection = getCollectionById(params.id);
  if (!collection) {
    return { title: 'كولكسيون غير موجود' };
  }

  return buildPageMetadata({
    title: `${collection.nameAr} | سِتْرة`,
    description: collection.description,
    path: `/collection/${collection.id}`,
    keywords: [collection.nameAr, 'حجاب', 'Sitraa', 'كولكسيون'],
  });
}

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = getCollectionById(params.id);
  if (!collection) notFound();

  const baseProducts = getProductsByCollection(collection.id);
  const products = await Promise.all(baseProducts.map((p) => getProductWithLivePrice(p)));

  return <CollectionPageContent collection={collection} products={products} />;
}
