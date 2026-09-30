type SizeOption = {

  label: string;

  range: string;

  bestFor: string;

};



const SIZES: SizeOption[] = [

  {

    label: 'مقاس 38 – 42',

    range: 'S / M',

    bestFor: 'مناسب للمقاسات الصغيرة والمتوسطة',

  },

  {

    label: 'مقاس 44 – 50',

    range: 'L / XL',

    bestFor: 'مناسب للمقاسات الكبيرة — راحة أكثر',

  },

];



export default function HijabSizeGuide() {

  return (

    <section className="bg-white p-5 rounded-2xl shadow-sm border border-secondary">

      <div className="flex items-center gap-2 mb-2">

        <span className="text-xl">📏</span>

        <h2 className="text-lg font-black text-text">دليل المقاس</h2>

      </div>

      <p className="text-gray-600 text-xs mb-4 leading-relaxed">

        مقاسين بس — اختاري حسب لبسك. إذا ما لبقاش، نبدلوه بلا ما نتعصبو.

      </p>



      <div className="grid grid-cols-1 gap-3 mb-4">

        {SIZES.map((size) => (

          <div

            key={size.label}

            className="rounded-xl border-2 border-secondary bg-cream/50 p-4"

          >

            <div className="flex items-center justify-between mb-2">

              <p className="text-accent font-black text-base">{size.label}</p>

              <span className="text-xs font-bold text-mocha/60 bg-white px-2 py-0.5 rounded-full border border-secondary">

                {size.range}

              </span>

            </div>

            <p className="text-xs text-gray-600">{size.bestFor}</p>

          </div>

        ))}

      </div>



      <div className="bg-secondary/40 rounded-xl p-3 border border-secondary">

        <p className="text-xs font-bold text-text mb-1">مش متأكدة؟</p>

        <p className="text-xs text-gray-600">

          38–42 للبداية إذا مقاسك بين 38 و 42. 44–50 إذا تلبسي 44 فما فوق.

        </p>

      </div>

    </section>

  );

}

