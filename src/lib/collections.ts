import { collections, type Collection } from '@/data/collections';
import { products, type Product } from '@/data/products';

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collectionId === collectionId);
}

export function getCollectionForProduct(product: Product): Collection | undefined {
  if (!product.collectionId) return undefined;
  return getCollectionById(product.collectionId);
}
