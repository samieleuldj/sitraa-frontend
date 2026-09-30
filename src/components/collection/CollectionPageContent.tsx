import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import type { Collection } from '@/data/collections';
import type { Product } from '@/data/products';

type Props = {
  collection: Collection;
  products: Product[];
};

export default function CollectionPageContent({ collection, products }: Props) {
  return (
    <div className="bg-cream min-h-screen pb-10 max-w-lg mx-auto">
      <div className="relative w-full aspect-[4/5] max-h-[420px] overflow-hidden bg-secondary">
        <Image
          src={collection.coverImage}
          alt={collection.nameAr}
          fill
          className={`object-cover ${collection.coverPosition ?? 'object-center'}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-1">
            {collection.nameEn}
          </p>
          <h1 className="text-2xl font-black">{collection.nameAr}</h1>
          <p className="text-sm text-white/90 mt-1">{collection.shortDescription}</p>
        </div>
      </div>

      <div className="px-4 py-3 text-xs text-gray-500 flex items-center gap-2 border-b border-secondary bg-white/80">
        <Link href="/" className="hover:text-primary">الرئيسية</Link>
        <span>/</span>
        <span className="text-text font-medium">{collection.nameAr}</span>
      </div>

      <div className="px-4 py-6">
        {collection.comingSoon ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-secondary">
            <span className="text-4xl block mb-3">✨</span>
            <h2 className="text-xl font-black text-text mb-2">قريباً في Sitraa</h2>
            <p className="text-sm text-gray-500 mb-6">{collection.description}</p>
            <Link
              href="/#collections"
              className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-full"
            >
              شوفي الكولكسيونات الأخرى
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-secondary">
            <span className="text-4xl block mb-3">🧕</span>
            <h2 className="text-xl font-black text-text mb-2">منتجات قريباً</h2>
            <p className="text-sm text-gray-500 mb-6">نحضّرو موديلات جديدة لهاد الكولكسيون.</p>
            <Link href="/" className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-full">
              الرجوع للرئيسية
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">{collection.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
