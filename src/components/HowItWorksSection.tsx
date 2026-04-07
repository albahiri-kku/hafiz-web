interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "١",
    title: "اختر الآية",
    description: "حدّد الآية التي تريد تلاوتها من أي سورة في القرآن الكريم",
  },
  {
    number: "٢",
    title: "سجّل تلاوتك",
    description: "اضغط على زر التسجيل وابدأ التلاوة — يكتشف النظام الصمت تلقائياً عند انتهائك",
  },
  {
    number: "٣",
    title: "احصل على التقييم",
    description: "يحلل النظام تلاوتك ويُظهر لك الأخطاء الصوتية والإملائية مع توجيهات للتحسين",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ paddingTop: '5rem', paddingBottom: '8rem', backgroundColor: 'white' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-bold text-emerald-900 mb-5"
            style={{ fontFamily: "Amiri, serif", fontSize: "clamp(2rem, 5vw, 2.8rem)" }}
          >
            كيف يعمل؟
          </h2>
          <p
            className="text-stone-500"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.15rem" }}
          >
            ثلاث خطوات فقط للحصول على تقييم دقيق
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex items-start gap-6 group"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center text-2xl font-bold shadow-md"
                style={{ fontFamily: "Amiri, serif" }}
              >
                {step.number}
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center self-stretch pt-14 -ml-8 pl-0 hidden md:flex">
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-emerald-200 -mt-8" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <h3
                  className="font-semibold text-emerald-900 mb-3"
                  style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.25rem" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-stone-500 leading-relaxed"
                  style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.05rem" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
