import Link from 'next/link';
import Image from 'next/image';
import type { Collection } from '@/data/collections';

type Props = {
  collection: Collection;
  priority?: boolean;
};

export default function CollectionCard({ collection, priority = false }: Props) {
  const card = (
    <article className="group bg-white rounded-2xl border border-secondary overflow-hidden shadow-sm h-full">
      <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.nameAr}
          fill
          className={`object-cover transition-transform duration-500 group-active:scale-105 ${collection.coverPosition ?? 'object-center'}`}
          sizes="(max-width: 512px) 100vw, 400px"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
        {collection.comingSoon && (
          <span className="absolute top-3 left-3 bg-white/95 text-text text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
            قريباً
          </span>
        )}
        <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-1">
            {collection.nameEn}
          </p>
          <h3 className="text-xl font-black leading-tight">{collection.nameAr}</h3>
          <p className="text-xs text-white/85 mt-1.5 line-clamp-2">{collection.shortDescription}</p>
        </div>
      </div>
      {!collection.comingSoon && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-secondary/60 bg-cream/30">
          <span className="text-xs text-gray-500">اكتشفي الموديلات</span>
          <span className="text-accent font-black text-sm">←</span>
        </div>
      )}
    </article>
  );

  if (collection.comingSoon) {
    return <div className="block h-full opacity-95">{card}</div>;
  }

  return (
    <Link href={collection.href} className="block h-full active:scale-[0.98] transition-transform">
      {card}
    </Link>
  );
}
