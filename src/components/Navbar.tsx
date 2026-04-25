import { Link } from "react-router-dom";

export function Navbar() {
  return (
    // dir="rtl" explicit — logo anchors to the right, CTA lands at far left
    <nav dir="rtl" className="fixed top-0 inset-x-0 z-50 border-b" style={{ backgroundColor: "rgba(253,248,240,0.85)", backdropFilter: "blur(12px)", borderColor: "#f5e0b5" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — first in DOM = rightmost in RTL */}
        <span
          className="text-2xl font-bold text-emerald-900"
          style={{ fontFamily: "Amiri, serif", fontSize: "1.6rem" }}
        >
          حافِظ
        </span>

        {/* Links + CTA — second in DOM = leftmost group in RTL.
            Inside this flex row, items also flow RTL:
            المميزات (right) → كيف يعمل (center) → تسجيل الدخول → ابدأ الآن (far left) */}
        <div className="flex items-center gap-7">
          <a
            href="#features"
            className="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "0.95rem" }}
          >
            المميزات
          </a>
          <a
            href="#how-it-works"
            className="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "0.95rem" }}
          >
            كيف يعمل
          </a>
          <Link
            to="/login"
            className="text-stone-600 hover:text-emerald-800 transition-colors font-medium"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "0.95rem" }}
          >
            تسجيل الدخول
          </Link>
          {/* CTA — last in DOM = far left in RTL */}
          <a
            href="https://hafiz-app-seven.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
            style={{ fontFamily: "Noto Sans Arabic, sans-serif", fontSize: "0.95rem" }}
          >
            ابدأ الآن
          </a>
        </div>

      </div>
    </nav>
  );
}
