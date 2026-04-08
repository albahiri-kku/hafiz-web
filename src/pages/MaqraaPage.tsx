import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MushafPage from "@/components/MushafPage";

const SURAH_PAGES: Record<number, number> = {
  1:1,2:2,3:50,4:77,5:106,6:128,7:151,8:177,9:187,10:208,
  11:221,12:235,13:249,14:255,15:262,16:267,17:282,18:293,
  19:305,20:312,21:322,22:332,23:342,24:350,25:359,26:367,
  27:377,28:385,29:396,30:404,31:411,32:415,33:418,34:428,
  35:434,36:440,37:446,38:453,39:458,40:467,41:477,42:483,
  43:489,44:496,45:499,46:502,47:507,48:511,49:515,50:518,
  51:520,52:523,53:526,54:528,55:531,56:534,57:537,58:542,
  59:545,60:549,61:551,62:553,63:554,64:556,65:558,66:560,
  67:562,68:564,69:566,70:568,71:570,72:572,73:574,74:575,
  75:577,76:578,77:580,78:582,79:583,80:585,81:586,82:587,
  83:587,84:589,85:590,86:591,87:591,88:592,89:593,90:594,
  91:595,92:595,93:596,94:596,95:597,96:597,97:598,98:598,
  99:599,100:599,101:600,102:600,103:601,104:601,105:601,
  106:602,107:602,108:602,109:603,110:603,111:603,112:604,
  113:604,114:604,
};

const SURAH_NAMES: Record<number, string> = {
  1:"الفاتحة",2:"البقرة",3:"آل عمران",4:"النساء",5:"المائدة",
  6:"الأنعام",7:"الأعراف",8:"الأنفال",9:"التوبة",10:"يونس",
  11:"هود",12:"يوسف",13:"الرعد",14:"إبراهيم",15:"الحجر",
  16:"النحل",17:"الإسراء",18:"الكهف",19:"مريم",20:"طه",
  21:"الأنبياء",22:"الحج",23:"المؤمنون",24:"النور",25:"الفرقان",
  26:"الشعراء",27:"النمل",28:"القصص",29:"العنكبوت",30:"الروم",
  31:"لقمان",32:"السجدة",33:"الأحزاب",34:"سبأ",35:"فاطر",
  36:"يس",37:"الصافات",38:"ص",39:"الزمر",40:"غافر",
  41:"فصلت",42:"الشورى",43:"الزخرف",44:"الدخان",45:"الجاثية",
  46:"الأحقاف",47:"محمد",48:"الفتح",49:"الحجرات",50:"ق",
  51:"الذاريات",52:"الطور",53:"النجم",54:"القمر",55:"الرحمن",
  56:"الواقعة",57:"الحديد",58:"المجادلة",59:"الحشر",60:"الممتحنة",
  61:"الصف",62:"الجمعة",63:"المنافقون",64:"التغابن",65:"الطلاق",
  66:"التحريم",67:"الملك",68:"القلم",69:"الحاقة",70:"المعارج",
  71:"نوح",72:"الجن",73:"المزمل",74:"المدثر",75:"القيامة",
  76:"الإنسان",77:"المرسلات",78:"النبأ",79:"النازعات",80:"عبس",
  81:"التكوير",82:"الانفطار",83:"المطففين",84:"الانشقاق",85:"البروج",
  86:"الطارق",87:"الأعلى",88:"الغاشية",89:"الفجر",90:"البلد",
  91:"الشمس",92:"الليل",93:"الضحى",94:"الشرح",95:"التين",
  96:"العلق",97:"القدر",98:"البينة",99:"الزلزلة",100:"العاديات",
  101:"القارعة",102:"التكاثر",103:"العصر",104:"الهمزة",105:"الفيل",
  106:"قريش",107:"الماعون",108:"الكوثر",109:"الكافرون",110:"النصر",
  111:"المسد",112:"الإخلاص",113:"الفلق",114:"الناس",
};

const toArabicIndic = (n: number): string =>
  String(n).split("").map(d => String.fromCharCode(0x0660 + +d)).join("");

const API_URL = "https://hafiz-production.up.railway.app";

export default function MaqraaPage() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState<"tilawa" | "hifz">("tilawa");
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleWordClick = useCallback((location: string) => {
    console.log("Word clicked:", location);
  }, []);

  const goNext = () => setPageNumber(p => Math.min(604, p + 1));
  const goPrev = () => setPageNumber(p => Math.max(1, p - 1));

  const handleRecord = async () => {
    if (isRecording) {
      setIsRecording(false);
      setShowEarlyAccess(true);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/v1/session/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ayah_code: "001001", model_size: "small" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
        setIsRecording(true);
      } else {
        setShowEarlyAccess(true);
      }
    } catch {
      setShowEarlyAccess(true);
    }
  };

  const submitEmail = () => {
    if (!email.includes("@")) return;
    const list: { email: string; date: string }[] = JSON.parse(
      localStorage.getItem("earlyAccess") || "[]"
    );
    list.push({ email, date: new Date().toISOString() });
    localStorage.setItem("earlyAccess", JSON.stringify(list));
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ background: "#f5f0e8" }}>

      {/* Header */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 border-b border-amber-900/30"
        style={{ background: "#1a2a1a" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-amber-400 font-bold text-lg hover:text-amber-300 transition-colors"
            style={{ fontFamily: "Amiri, serif" }}
          >
            حافِظ
          </button>
          <div className="w-px h-5 bg-white/20" />
          <div className="flex rounded-lg overflow-hidden border border-white/20 text-xs">
            <button
              onClick={() => setMode("hifz")}
              className={`px-3 py-1.5 transition-colors ${
                mode === "hifz" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              📖 حفظ
            </button>
            <button
              onClick={() => setMode("tilawa")}
              className={`px-3 py-1.5 transition-colors ${
                mode === "tilawa" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              🎙 تلاوة
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white/50 text-xs hidden sm:block">
            صفحة {toArabicIndic(pageNumber)} / ٦٠٤
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/70 hover:text-white transition-colors text-sm px-2 py-1 rounded"
          >
            ☰ السور
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex" onClick={() => setSidebarOpen(false)}>
          <aside
            className="w-64 h-full overflow-y-auto shadow-2xl border-l border-amber-200"
            style={{ background: "#fffef9", marginRight: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 p-4 border-b border-amber-100" style={{ background: "#fffef9" }}>
              <h3 className="font-bold text-sm text-gray-800">فهرس السور</h3>
            </div>
            {Object.entries(SURAH_NAMES).map(([num, name]) => (
              <button
                key={num}
                onClick={() => {
                  setPageNumber(SURAH_PAGES[Number(num)] ?? 1);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs hover:bg-amber-50 transition-colors text-right border-b border-amber-50/50"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {num}
                  </span>
                  <span className="font-medium text-gray-800">{name}</span>
                </div>
                <span className="text-gray-400 text-xs">ص{SURAH_PAGES[Number(num)]}</span>
              </button>
            ))}
          </aside>
          <div className="flex-1" />
        </div>
      )}

      {/* Main Mushaf */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-4 pb-36">
        <MushafPage
          pageNumber={pageNumber}
          onWordClick={handleWordClick}
          mode={mode}
        />

        {/* Page Navigation */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={goNext}
            disabled={pageNumber >= 604}
            className="px-4 py-2 text-xs rounded-lg border border-amber-300 text-gray-700 hover:bg-amber-50 disabled:opacity-30 transition-colors"
          >
            ← التالية
          </button>
          <span className="text-sm text-gray-500">
            {toArabicIndic(pageNumber)} / ٦٠٤
          </span>
          <button
            onClick={goPrev}
            disabled={pageNumber <= 1}
            className="px-4 py-2 text-xs rounded-lg border border-amber-300 text-gray-700 hover:bg-amber-50 disabled:opacity-30 transition-colors"
          >
            السابقة →
          </button>
        </div>
      </main>

      {/* Floating Record Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
        {showEarlyAccess && !emailSent && (
          <div className="bg-emerald-800 text-white rounded-2xl p-4 shadow-xl w-72 mb-2">
            <p className="text-sm font-bold mb-1">🚀 الوصول المبكر</p>
            <p className="text-xs text-white/80 mb-3">ميزة التصحيح الصوتي قادمة — سجّل بريدك</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitEmail()}
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none"
                style={{ direction: "ltr" }}
              />
              <button
                onClick={submitEmail}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-bold transition-colors"
              >
                سجّل
              </button>
            </div>
          </div>
        )}

        {emailSent && (
          <div className="bg-emerald-700 text-white text-sm rounded-xl px-4 py-2 mb-2 shadow-lg">
            ✅ تم التسجيل! سنتواصل معك قريباً
          </div>
        )}

        <button
          onClick={handleRecord}
          className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-xl transition-all duration-200 ${
            isRecording
              ? "bg-red-600 scale-110 shadow-red-400/40"
              : "bg-emerald-700 hover:bg-emerald-600 hover:scale-105"
          }`}
        >
          <span className="text-2xl">{isRecording ? "⏹" : "🎙"}</span>
        </button>
        <span className="text-xs text-gray-500 font-medium">
          {isRecording ? "جاري التسجيل..." : "ابدأ التسجيل"}
        </span>

        {sessionId && !isRecording && (
          <span className="text-xs text-gray-400">جلسة: {sessionId.slice(0, 8)}…</span>
        )}
      </div>
    </div>
  );
}
