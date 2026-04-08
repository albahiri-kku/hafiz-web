// v5.0 — MushafPage with ayah-level grouping, auto-scroll, and current-ayah highlight
import { useEffect, useRef } from "react";
import { useMushafData, type MushafLineData, type MushafWordData } from "@/hooks/useMushafData";
import "./MushafPage.css";

const FONT_CDN = "https://verses.quran.foundation/fonts/quran/hafs/v1/woff2";

const SURAH_NAMES: Record<number, string> = {
  1:"سُورَةُ الْفَاتِحَة",2:"سُورَةُ الْبَقَرَة",3:"سُورَةُ آلِ عِمْرَان",
  4:"سُورَةُ النِّسَاء",5:"سُورَةُ الْمَائِدَة",6:"سُورَةُ الْأَنْعَام",
  7:"سُورَةُ الْأَعْرَاف",8:"سُورَةُ الْأَنْفَال",9:"سُورَةُ التَّوْبَة",
  10:"سُورَةُ يُونُس",11:"سُورَةُ هُود",12:"سُورَةُ يُوسُف",
  13:"سُورَةُ الرَّعْد",14:"سُورَةُ إِبْرَاهِيم",15:"سُورَةُ الْحِجْر",
  16:"سُورَةُ النَّحْل",17:"سُورَةُ الْإِسْرَاء",18:"سُورَةُ الْكَهْف",
  19:"سُورَةُ مَرْيَم",20:"سُورَةُ طه",21:"سُورَةُ الْأَنْبِيَاء",
  22:"سُورَةُ الْحَجّ",23:"سُورَةُ الْمُؤْمِنُون",24:"سُورَةُ النُّور",
  25:"سُورَةُ الْفُرْقَان",26:"سُورَةُ الشُّعَرَاء",27:"سُورَةُ النَّمْل",
  28:"سُورَةُ الْقَصَص",29:"سُورَةُ الْعَنْكَبُوت",30:"سُورَةُ الرُّوم",
  31:"سُورَةُ لُقْمَان",32:"سُورَةُ السَّجْدَة",33:"سُورَةُ الْأَحْزَاب",
  34:"سُورَةُ سَبَأ",35:"سُورَةُ فَاطِر",36:"سُورَةُ يس",
  37:"سُورَةُ الصَّافَّات",38:"سُورَةُ ص",39:"سُورَةُ الزُّمَر",
  40:"سُورَةُ غَافِر",41:"سُورَةُ فُصِّلَت",42:"سُورَةُ الشُّورَىٰ",
  43:"سُورَةُ الزُّخْرُف",44:"سُورَةُ الدُّخَان",45:"سُورَةُ الْجَاثِيَة",
  46:"سُورَةُ الْأَحْقَاف",47:"سُورَةُ مُحَمَّد",48:"سُورَةُ الْفَتْح",
  49:"سُورَةُ الْحُجُرَات",50:"سُورَةُ ق",51:"سُورَةُ الذَّارِيَات",
  52:"سُورَةُ الطُّور",53:"سُورَةُ النَّجْم",54:"سُورَةُ الْقَمَر",
  55:"سُورَةُ الرَّحْمَٰن",56:"سُورَةُ الْوَاقِعَة",57:"سُورَةُ الْحَدِيد",
  58:"سُورَةُ الْمُجَادَلَة",59:"سُورَةُ الْحَشْر",60:"سُورَةُ الْمُمْتَحَنَة",
  61:"سُورَةُ الصَّفّ",62:"سُورَةُ الْجُمُعَة",63:"سُورَةُ الْمُنَافِقُون",
  64:"سُورَةُ التَّغَابُن",65:"سُورَةُ الطَّلَاق",66:"سُورَةُ التَّحْرِيم",
  67:"سُورَةُ الْمُلْك",68:"سُورَةُ الْقَلَم",69:"سُورَةُ الْحَاقَّة",
  70:"سُورَةُ الْمَعَارِج",71:"سُورَةُ نُوح",72:"سُورَةُ الْجِنّ",
  73:"سُورَةُ الْمُزَّمِّل",74:"سُورَةُ الْمُدَّثِّر",75:"سُورَةُ الْقِيَامَة",
  76:"سُورَةُ الْإِنْسَان",77:"سُورَةُ الْمُرْسَلَات",78:"سُورَةُ النَّبَأ",
  79:"سُورَةُ النَّازِعَات",80:"سُورَةُ عَبَسَ",81:"سُورَةُ التَّكْوِير",
  82:"سُورَةُ الْانْفِطَار",83:"سُورَةُ الْمُطَفِّفِين",84:"سُورَةُ الْانْشِقَاق",
  85:"سُورَةُ الْبُرُوج",86:"سُورَةُ الطَّارِق",87:"سُورَةُ الْأَعْلَى",
  88:"سُورَةُ الْغَاشِيَة",89:"سُورَةُ الْفَجْر",90:"سُورَةُ الْبَلَد",
  91:"سُورَةُ الشَّمْس",92:"سُورَةُ اللَّيْل",93:"سُورَةُ الضُّحَىٰ",
  94:"سُورَةُ الشَّرْح",95:"سُورَةُ التِّين",96:"سُورَةُ الْعَلَق",
  97:"سُورَةُ الْقَدْر",98:"سُورَةُ الْبَيِّنَة",99:"سُورَةُ الزَّلْزَلَة",
  100:"سُورَةُ الْعَادِيَات",101:"سُورَةُ الْقَارِعَة",102:"سُورَةُ التَّكَاثُر",
  103:"سُورَةُ الْعَصْر",104:"سُورَةُ الْهُمَزَة",105:"سُورَةُ الْفِيل",
  106:"سُورَةُ قُرَيْش",107:"سُورَةُ الْمَاعُون",108:"سُورَةُ الْكَوْثَر",
  109:"سُورَةُ الْكَافِرُون",110:"سُورَةُ النَّصْر",111:"سُورَةُ الْمَسَد",
  112:"سُورَةُ الْإِخْلَاص",113:"سُورَةُ الْفَلَق",114:"سُورَةُ النَّاس",
};

const toArabicIndic = (n: number): string =>
  String(n).split('').map(d => String.fromCharCode(0x0660 + +d)).join('');

const loadedFonts = new Set<number>();

function loadPageFont(pageNumber: number): Promise<boolean> {
  if (loadedFonts.has(pageNumber)) return Promise.resolve(true);
  const fontFamily = `p${pageNumber}-v1`;
  const url = `${FONT_CDN}/p${pageNumber}.woff2`;
  return new Promise((resolve) => {
    const font = new FontFace(fontFamily, `url(${url})`);
    const timeout = setTimeout(() => resolve(false), 6000);
    font.load().then((loaded) => {
      clearTimeout(timeout);
      document.fonts.add(loaded);
      loadedFonts.add(pageNumber);
      resolve(true);
    }).catch(() => {
      clearTimeout(timeout);
      resolve(false);
    });
  });
}

export interface WordHighlight {
  currentWordLocation: string | null;
  correctWords: Set<string>;
  wrongWords: Set<string>;
}

function getWordStyle(location: string, highlight?: WordHighlight): React.CSSProperties {
  if (!highlight) return {};
  if (location === highlight.currentWordLocation)
    return { color: '#C9A84C', fontWeight: 'bold', textShadow: '0 0 8px rgba(201,168,76,0.6)' };
  if (highlight.correctWords.has(location)) return { color: '#27AE60' };
  if (highlight.wrongWords.has(location))   return { color: '#E74C3C' };
  if (highlight.currentWordLocation)        return { color: '#8E9AAF' };
  return {};
}

function getAyahKey(location: string): string {
  const parts = location.split(':');
  return `${parts[0]}:${parts[1]}`;
}

function ayahKeyToCode(ayahKey: string): string {
  const [s, a] = ayahKey.split(':');
  return String(parseInt(s)).padStart(3, '0') + String(parseInt(a)).padStart(3, '0');
}

export interface MushafPageProps {
  pageNumber: number;
  onWordClick?: (location: string) => void;
  highlight?: WordHighlight;
  mode?: 'tilawa' | 'hifz';
  revealedLocations?: Set<string>;
  currentAyahCode?: string;
}

export default function MushafPage({
  pageNumber, onWordClick, highlight,
  mode = 'tilawa', revealedLocations, currentAyahCode
}: MushafPageProps) {
  const { data, isLoading, error } = useMushafData(pageNumber);
  const fontLoaded = useRef(false);

  useEffect(() => {
    loadPageFont(pageNumber).then(ok => { fontLoaded.current = ok; });
    if (pageNumber > 1)   loadPageFont(pageNumber - 1);
    if (pageNumber < 604) loadPageFont(pageNumber + 1);
  }, [pageNumber]);

  useEffect(() => {
    if (!currentAyahCode) return;
    const el = document.getElementById(`ayah-${currentAyahCode}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentAyahCode]);

  if (isLoading) {
    return (
      <div className="mushaf-page">
        <div className="mushaf-frame">
          <div className="mushaf-skeleton">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="mushaf-skeleton-line"
                style={{ width: `${70 + (i * 17 % 30)}%`, marginRight: `${i % 3 === 0 ? 0 : (i * 7 % 15)}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mushaf-page">
        <div className="mushaf-frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <p style={{ color: '#CC0000', fontFamily: 'sans-serif', fontSize: 14 }}>⚠ {error || 'خطأ في التحميل'}</p>
        </div>
      </div>
    );
  }

  const fontFamily = `p${pageNumber}-v1, 'Scheherazade New', 'Amiri', serif`;
  const isCenteredPage = pageNumber === 1 || pageNumber === 2;

  return (
    <div className="mushaf-page">
      <div className="mushaf-frame">
        <div className="mushaf-frame-inner">
          {data.lines.map((line: MushafLineData, idx: number) => (
            <MushafLineView
              key={`${pageNumber}-${line.line}-${idx}`}
              line={line}
              fontFamily={fontFamily}
              isCenteredPage={isCenteredPage}
              onWordClick={onWordClick}
              highlight={highlight}
              mode={mode}
              revealedLocations={revealedLocations}
              currentAyahCode={currentAyahCode}
            />
          ))}
        </div>
      </div>
      <div className="mushaf-page-number">{toArabicIndic(pageNumber)}</div>
    </div>
  );
}

interface LineProps {
  line: MushafLineData;
  fontFamily: string;
  isCenteredPage: boolean;
  onWordClick?: (location: string) => void;
  highlight?: WordHighlight;
  mode?: 'tilawa' | 'hifz';
  revealedLocations?: Set<string>;
  currentAyahCode?: string;
}

function MushafLineView({
  line, fontFamily, isCenteredPage, onWordClick,
  highlight, mode, revealedLocations, currentAyahCode
}: LineProps) {
  if (line.type === 'basmala') {
    return (
      <div className="mushaf-line centered mushaf-basmallah-line">
        <span className="mushaf-basmallah-text">﷽</span>
      </div>
    );
  }

  if (line.type === 'surah-header') {
    const surahNum = parseInt(line.surah || '1', 10);
    const fullName = SURAH_NAMES[surahNum] || line.text || '';
    return (
      <div className="mushaf-line centered">
        <div className="mushaf-surah-banner">
          <SideDecor />
          <div className="mushaf-surah-banner-inner" />
          <span className="mushaf-surah-banner-text"
            style={{ fontFamily: "'Amiri', serif" }}>
            {fullName}
          </span>
          <div className="mushaf-surah-banner-inner" />
          <SideDecor />
        </div>
      </div>
    );
  }

  if (!line.words || line.words.length === 0) {
    return (
      <div className={`mushaf-line${isCenteredPage ? ' centered-page' : ''}`} style={{ fontFamily }}>
        <span>{line.text}</span>
      </div>
    );
  }

  // Group words by ayah
  const ayahGroups: { ayahKey: string; ayahCode: string; words: { w: MushafWordData; idx: number }[] }[] = [];
  let currentGroup: (typeof ayahGroups)[0] | null = null;

  line.words.forEach((w: MushafWordData, i: number) => {
    const ak = getAyahKey(w.location);
    if (!currentGroup || currentGroup.ayahKey !== ak) {
      currentGroup = { ayahKey: ak, ayahCode: ayahKeyToCode(ak), words: [] };
      ayahGroups.push(currentGroup);
    }
    currentGroup.words.push({ w, idx: i });
  });

  return (
    <div className={`mushaf-line${isCenteredPage ? ' centered-page' : ''}`}>
      {ayahGroups.map((group) => {
        const isCurrentAyah = currentAyahCode === group.ayahCode;
        return (
          <span
            key={group.ayahKey}
            id={`ayah-${group.ayahCode}`}
            className="mushaf-ayah-group"
            style={{
              backgroundColor: isCurrentAyah ? 'rgba(201,168,76,0.08)' : 'transparent',
              borderRadius: '6px',
              padding: '2px 4px',
              transition: 'background-color 0.3s ease',
              display: 'inline',
            }}
          >
            {group.words.map(({ w, idx }) => {
              const isHidden = mode === 'hifz' && revealedLocations && !revealedLocations.has(w.location);
              const wordStyle = getWordStyle(w.location, highlight);
              let cls = 'mushaf-word';
              if (highlight?.currentWordLocation === w.location) cls += ' word-current';
              if (highlight?.wrongWords.has(w.location))        cls += ' word-error';
              if (isHidden)                                      cls += ' word-hidden';
              return (
                <span
                  key={`${w.location}-${idx}`}
                  className={cls}
                  style={{ fontFamily, ...wordStyle }}
                  data-word-key={w.location}
                  onClick={() => onWordClick?.(w.location)}
                >
                  {w.qpcV1}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}

function SideDecor() {
  return (
    <div className="mushaf-surah-banner-svg-right">
      <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="56" fill="#1a1a1a"/>
        <rect x="2" y="2" width="76" height="52" fill="none" stroke="#c8a84e" strokeWidth="0.8"/>
        <ellipse cx="40" cy="28" rx="20" ry="20" fill="none" stroke="#c8a84e" strokeWidth="1.2"/>
        <ellipse cx="40" cy="28" rx="16" ry="16" fill="none" stroke="#c8a84e" strokeWidth="0.6"/>
        <circle cx="40" cy="28" r="4" fill="#c8a84e" opacity="0.6"/>
        <path d="M8 6 C18 2 28 8 40 4 C52 8 62 2 72 6" fill="none" stroke="#c8a84e" strokeWidth="0.8"/>
        <path d="M8 50 C18 54 28 48 40 52 C52 48 62 54 72 50" fill="none" stroke="#c8a84e" strokeWidth="0.8"/>
        <circle cx="8"  cy="8"  r="1.5" fill="#c8a84e"/>
        <circle cx="72" cy="8"  r="1.5" fill="#c8a84e"/>
        <circle cx="8"  cy="48" r="1.5" fill="#c8a84e"/>
        <circle cx="72" cy="48" r="1.5" fill="#c8a84e"/>
      </svg>
    </div>
  );
}

export type { MushafWordData, MushafLineData };
