import { useState, useEffect } from 'react';

export interface MushafWordData {
  location: string;
  word: string;
  qpcV1: string;
  qpcV2?: string;
}

export interface MushafLineData {
  line: number;
  type: 'text' | 'surah-header' | 'basmala';
  text?: string;
  surah?: string;
  verseRange?: string;
  words?: MushafWordData[];
}

interface MushafPageData {
  page: number;
  lines: MushafLineData[];
}

const memCache = new Map<number, MushafPageData>();
const MUSHAF_CDN = 'https://raw.githubusercontent.com/zonetecde/mushaf-layout/main/mushaf';

export function useMushafData(pageNumber: number) {
  const [data, setData] = useState<MushafPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Memory cache hit
    if (memCache.has(pageNumber)) {
      setData(memCache.get(pageNumber)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // localStorage cache hit
    const lsKey = `mushaf_p${pageNumber}`;
    try {
      const raw = localStorage.getItem(lsKey);
      if (raw) {
        const parsed: MushafPageData = JSON.parse(raw);
        memCache.set(pageNumber, parsed);
        setData(parsed);
        setIsLoading(false);
        return;
      }
    } catch { /* ignore */ }

    // Fetch from CDN
    const pad = String(pageNumber).padStart(3, '0');
    fetch(`${MUSHAF_CDN}/page-${pad}.json`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: any[]) => {
        const transformed: MushafPageData = {
          page: pageNumber,
          lines: json.map((line: any) => ({
            line: line.line,
            type:
              line.type === 'surah-header' ? 'surah-header' :
              line.type === 'basmala' || line.type === 'basmallah' ? 'basmala' :
              'text',
            text: line.text,
            surah: String(line.surah ?? ''),
            verseRange: line.verseRange,
            words: line.words?.map((w: any) => ({
              location: w.location,
              word: w.word,
              qpcV1: w.qpcV1,
              qpcV2: w.qpcV2,
            })),
          })),
        };
        memCache.set(pageNumber, transformed);
        try { localStorage.setItem(lsKey, JSON.stringify(transformed)); } catch { /* quota */ }
        setData(transformed);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [pageNumber]);

  return { data, isLoading, error };
}
