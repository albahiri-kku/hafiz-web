interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "⚡",
    title: "تقييم فوري",
    description: "يحلل تلاوتك كلمة بكلمة في الوقت الفعلي ويعطيك نتيجة فورية دون انتظار",
  },
  {
    icon: "🎯",
    title: "أحكام التجويد",
    description: "يكشف أخطاء المد والغنة والقلقلة والنون الساكنة والميم الساكنة وغيرها",
  },
  {
    icon: "📖",
    title: "تتبع بصري",
    description: "يتابع موضعك في المصحف أثناء التلاوة ويعرض الكلمات بألوان تدل على الأداء",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-parchment-200 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-parchment-100 flex items-center justify-center text-3xl">
        {feature.icon}
      </div>
      <h3
        className="font-semibold text-emerald-900"
        style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.25rem" }}
      >
        {feature.title}
      </h3>
      <p
        className="text-stone-500 leading-relaxed"
        style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.05rem" }}
      >
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-parchment-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-bold text-emerald-900 mb-5"
            style={{ fontFamily: "Amiri, serif", fontSize: "clamp(2rem, 5vw, 2.8rem)" }}
          >
            لماذا حافِظ؟
          </h2>
          <p
            className="text-stone-500"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "1.15rem" }}
          >
            أداة مصممة خصيصاً لمساعدة حافظي القرآن الكريم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
