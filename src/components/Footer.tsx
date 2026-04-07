export function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-12 px-6" dir="rtl">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-right">
          <p className="text-2xl font-bold mb-1" style={{ fontFamily: "Amiri, serif" }}>
            حافِظ
          </p>
          <p className="text-emerald-300 text-sm" style={{ fontFamily: "Noto Sans Arabic, sans-serif" }}>
            نظام ذكاء اصطناعي لتقييم تلاوة القرآن الكريم
          </p>
        </div>
        <p className="text-emerald-400 text-sm" style={{ fontFamily: "Noto Sans Arabic, sans-serif" }}>
          © {new Date().getFullYear()} حافِظ · جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
