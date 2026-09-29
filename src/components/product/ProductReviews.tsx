import Image from 'next/image';

export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
  photo?: string;
  reviewImage?: string;
};

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating?: number;
  reviewCount?: number;
}

export default function ProductReviews({ reviews, rating = 4.8, reviewCount }: ProductReviewsProps) {
  const count = reviewCount ?? reviews.length;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-black text-text">واش قالو زبائننا؟</h2>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
          <span className="font-bold text-yellow-700">{rating}/5</span>
          <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
          <span className="text-xs text-yellow-800">({count}+ تقييم)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className={index < reviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {review.photo ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex-shrink-0">
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                    {review.initial}
                  </div>
                )}
                <div>
                  <span className="font-bold text-gray-800 block">
                    {review.name}{' '}
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded mr-1">
                      مشترِ مؤكد ✓
                    </span>
                  </span>
                  <span className="text-xs text-gray-400">{review.city}</span>
                </div>
              </div>
              <div className="flex text-yellow-400 text-sm flex-shrink-0">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
            {review.reviewImage && (
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 max-w-[280px] shadow-sm">
                <Image
                  src={review.reviewImage}
                  alt={`صورة من ${review.name}`}
                  width={560}
                  height={560}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
