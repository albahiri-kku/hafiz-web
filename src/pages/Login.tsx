import { useEffect, useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";

type AccountType = "individual" | "institution" | "halaqa";

type AccountOption = {
  id: AccountType;
  label: string;
  subtitle: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const HAFIZ_GOLD = "#C9A84C";
const HAFIZ_GOLD_SOFT = "#FBF3DD";
const HAFIZ_GREEN = "#2D6A4F";

function IndividualIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function InstitutionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </svg>
  );
}

function HalaqaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="17" cy="10" r="2.6" />
      <path d="M3 19c0-3 2.7-5.4 6-5.4s6 2.4 6 5.4" />
      <path d="M14.5 18c.4-2.2 2.3-3.8 4.5-3.8 1 0 1.9.3 2.6.8" />
    </svg>
  );
}

const ACCOUNT_OPTIONS: AccountOption[] = [
  { id: "individual", label: "فرد", subtitle: "للحفظ والتلاوة الشخصية", Icon: IndividualIcon },
  { id: "institution", label: "مؤسسة تعليمية", subtitle: "للوصول المؤسسي وAPI", Icon: InstitutionIcon },
  { id: "halaqa", label: "حلقة تحفيظ", subtitle: "للمشرفين والمعلمين", Icon: HalaqaIcon },
];

export default function Login() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const previous = document.title;
    document.title = "بوابة الدخول — حافِظ";
    return () => {
      document.title = previous;
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/dashboard?type=${accountType}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      dir="rtl"
      style={{ fontFamily: "'Noto Sans Arabic', sans-serif", backgroundColor: "#fdf8f0" }}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ border: "1px solid #ece4d0" }}
      >
        <header
          className="px-8 py-6 flex items-center justify-between"
          style={{ backgroundColor: HAFIZ_GREEN }}
        >
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: HAFIZ_GOLD, fontFamily: "'Amiri', serif" }}
          >
            حافِظ
          </span>
          <span className="text-sm" style={{ color: "#e9f1ec" }}>
            نظام تقييم التلاوة
          </span>
        </header>

        <div className="px-8 py-8">
          <h1
            className="text-2xl font-bold text-center mb-2"
            style={{ color: "#1a1a1a" }}
          >
            بوابة الدخول — حافِظ
          </h1>
          <p className="text-center text-sm mb-6" style={{ color: "#6b6358" }}>
            اختر نوع الحساب للمتابعة
          </p>

          <div role="radiogroup" aria-label="نوع الحساب" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
            {ACCOUNT_OPTIONS.map(({ id, label, subtitle, Icon }) => {
              const selected = accountType === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAccountType(id)}
                  className="text-right p-4 rounded-xl transition-colors flex flex-col items-center text-center gap-2 focus:outline-none"
                  style={{
                    border: `2px solid ${selected ? HAFIZ_GOLD : "#e6dfce"}`,
                    backgroundColor: selected ? HAFIZ_GOLD_SOFT : "#ffffff",
                    color: selected ? "#5b4a16" : "#3a3a3a",
                  }}
                >
                  <Icon width={28} height={28} style={{ color: selected ? HAFIZ_GOLD : HAFIZ_GREEN }} />
                  <span className="text-base font-semibold leading-tight">{label}</span>
                  <span className="text-xs leading-snug" style={{ color: selected ? "#7a6824" : "#6b6358" }}>
                    {subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm mb-1.5" style={{ color: "#3a3a3a" }}>
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                autoComplete="email"
                className="w-full px-3 py-2.5 rounded-lg text-right focus:outline-none"
                style={{
                  border: "1px solid #d8cfb8",
                  backgroundColor: "#fdfaf2",
                  fontFamily: "'Noto Sans Arabic', sans-serif",
                }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1.5" style={{ color: "#3a3a3a" }}>
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-3 py-2.5 rounded-lg text-right focus:outline-none"
                style={{
                  border: "1px solid #d8cfb8",
                  backgroundColor: "#fdfaf2",
                  fontFamily: "'Noto Sans Arabic', sans-serif",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: HAFIZ_GREEN }}
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: "1px solid #ece4d0" }}>
            <p className="text-sm mb-2" style={{ color: "#6b6358" }}>
              ليس لديك حساب؟
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
              <a href="#" className="font-medium hover:underline" style={{ color: HAFIZ_GREEN }}>
                تسجيل كفرد
              </a>
              <span style={{ color: "#c9bfa4" }}>|</span>
              <a href="#" className="font-medium hover:underline" style={{ color: HAFIZ_GREEN }}>
                تسجيل مؤسسة
              </a>
              <span style={{ color: "#c9bfa4" }}>|</span>
              <a href="#" className="font-medium hover:underline" style={{ color: HAFIZ_GREEN }}>
                تسجيل حلقة
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
