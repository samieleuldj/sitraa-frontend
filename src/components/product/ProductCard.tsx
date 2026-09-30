import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/products';

type Props = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: Props) {
  const image = product.images?.[0];

  return (
    <article className="bg-white rounded-2xl border border-secondary overflow-hidden shadow-sm active:scale-[0.98] transition-transform flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] bg-gradient-to-br from-secondary to-cream">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-mocha/50">
            <span className="text-3xl mb-1">🧕</span>
            <span className="text-[10px] font-medium">صورة قريباً</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-2 right-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? 'p-3' : 'p-4'}`}>
        <Link href={`/product/${product.id}`}>
          <h3 className={`font-black text-text leading-snug mb-1 hover:text-primary transition-colors ${compact ? 'text-sm line-clamp-2' : 'text-base'}`}>
            {product.name}
          </h3>
        </Link>
        {!compact && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className={`font-black text-primary ${compact ? 'text-lg' : 'text-xl'}`}>{product.price} دج</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{product.oldPrice} دج</span>
          )}
        </div>
        <Link
          href={`/product/${product.id}#order-form`}
          className={`block text-center bg-accent active:bg-primary text-white font-bold rounded-xl transition-colors ${compact ? 'py-2.5 text-sm' : 'py-3'}`}
        >
          اطلبي الآن
        </Link>
      </div>
    </article>
  );
}
