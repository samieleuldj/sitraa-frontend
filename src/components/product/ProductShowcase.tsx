import Image from 'next/image';

interface ProductShowcaseProps {
  images: string[];
  productName: string;
}

export default function ProductShowcase({ images, productName }: ProductShowcaseProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div
          key={image}
          className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        >
          <Image
            src={image}
            alt={`${productName} - عرض ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
