// Islamic geometric background: single diamond (10px square rotated 45deg) on 40x40 tile
const GEOMETRIC_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='15' y='15' width='10' height='10' transform='rotate(45 20 20)' fill='none' stroke='%232D6A4F' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`;

const TAGLINE = "\u064A\u0643\u0634\u0641 \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u062A\u0644\u0627\u0648\u0629 \u0648\u0627\u0644\u062A\u062C\u0648\u064A\u062F";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ backgroundColor: "#fdf8f0", backgroundImage: GEOMETRIC_PATTERN, paddingBottom: "3.6rem" }}
    >
      {/* Radial glow over pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(253,248,240,0.82) 0%, rgba(253,248,240,0.40) 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto" style={{ animation: "fadeIn 0.7s ease-in-out" }}>

        {/* Logo */}
        <h1
          className="font-bold text-emerald-900 leading-none"
          style={{
            fontFamily: "Amiri, serif",
            fontSize: "clamp(6.3rem, 16vw, 9.9rem)",
            marginBottom: "1.35rem",
          }}
        >
          {"\u062D\u0627\u0641\u0650\u0638"}
        </h1>

        {/* Decorative divider */}
        <div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          gap:'12px',
          marginBottom:'1.8rem'
        }}>
          <div style={{height:'1px',width:'80px',backgroundColor:'#2D6A4F',opacity:0.4,flexShrink:0}} />
          <div style={{width:'8px',height:'8px',backgroundColor:'#C9A84C',transform:'rotate(45deg)',flexShrink:0}} />
          <div style={{height:'1px',width:'80px',backgroundColor:'#2D6A4F',opacity:0.4,flexShrink:0}} />
        </div>

        {/* Tagline */}
        <p
          className="font-semibold text-emerald-900 leading-snug"
          style={{
            fontFamily: "Noto Sans Arabic, sans-serif",
            fontSize: "clamp(1.26rem, 3.6vw, 1.8rem)",
            marginBottom: "1.125rem",
          }}
        >
          {TAGLINE}
        </p>

        {/* Sub-tagline */}
        <p
          className="text-stone-600 leading-relaxed"
          style={{
            fontFamily: "Noto Sans Arabic, sans-serif",
            fontSize: "clamp(0.99rem, 2.7vw, 1.215rem)",
            marginBottom: "2.25rem",
          }}
        >
          {"\u0646\u0638\u0627\u0645 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u062A\u0642\u064A\u064A\u0645 \u062A\u0644\u0627\u0648\u0629 \u0627\u0644\u0642\u0631\u0622\u0646 \u0627\u0644\u0643\u0631\u064A\u0645"}
        </p>

        {/* CTA */}
        <div style={{ width: "fit-content", margin: "0 auto" }}>
          <a
            href="#"
            className="inline-block bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{
              fontFamily: "Noto Sans Arabic, sans-serif",
              fontSize: "1.08rem",
              paddingLeft: "2.7rem",
              paddingRight: "2.7rem",
              paddingTop: "1.125rem",
              paddingBottom: "1.125rem",
            }}
          >
            {"\u062C\u0631\u0651\u0628 \u062D\u0627\u0641\u0638"}
          </a>
        </div>

        {/* Scroll arrow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2.25rem", opacity: 0.4 }}>
          <svg
            style={{ width: "1.5rem", height: "1.5rem", color: "#78716c" }}
            className="animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </div>
    </section>
  );
}
