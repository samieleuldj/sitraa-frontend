'use client';

import ProductVideoPlayer from './ProductVideoPlayer';

interface UsageSectionProps {
  steps: string[];
  title?: string;
  videoFile?: string;
  videoPoster?: string;
}

export default function UsageSection({ steps, title = 'طريقة الاستعمال', videoFile, videoPoster }: UsageSectionProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">📋</div>
        <h2 className="text-2xl font-black text-text">{title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>

        {videoFile ? (
          <ProductVideoPlayer
            videoFile={videoFile}
            videoPoster={videoPoster}
            title={title}
            playLabel={`شوف ${title}`}
          />
        ) : null}
      </div>
    </div>
  );
}
