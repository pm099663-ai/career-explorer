import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_COLLEGES } from "../data/seedColleges";
import type { College } from "../types/college";

const STORAGE_KEY = "mp-engineering-colleges-v1";
const COMPARE_KEY = "mp-engineering-compare-v1";

interface CollegeDataContextValue {
  colleges: College[];
  compareIds: string[];
  setCompareIds: (ids: string[]) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  importColleges: (data: College[], mode: "replace" | "merge") => void;
  resetToSeed: () => void;
  lastImportAt: string | null;
}

const CollegeDataContext = createContext<CollegeDataContextValue | null>(null);

function loadColleges(): College[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as College[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* use seed */
  }
  return SEED_COLLEGES;
}

function loadCompare(): string[] {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) return parsed.slice(0, 4);
    }
  } catch {
    /* ignore */
  }
  return [];
}

export function CollegeDataProvider({ children }: { children: ReactNode }) {
  const [colleges, setColleges] = useState<College[]>(loadColleges);
  const [compareIds, setCompareIdsState] = useState<string[]>(loadCompare);
  const [lastImportAt, setLastImportAt] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const setCompareIds = useCallback((ids: string[]) => {
    setCompareIdsState(ids.slice(0, 4));
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompareIdsState((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => setCompareIdsState([]), []);

  const importColleges = useCallback(
    (data: College[], mode: "replace" | "merge") => {
      if (mode === "replace") {
        setColleges(data);
      } else {
        const byId = new Map(colleges.map((c) => [c.id, c]));
        for (const c of data) byId.set(c.id, c);
        setColleges([...byId.values()]);
      }
      setLastImportAt(new Date().toISOString());
    },
    [colleges]
  );

  const resetToSeed = useCallback(() => {
    setColleges(SEED_COLLEGES);
    setLastImportAt(null);
  }, []);

  const value = useMemo(
    () => ({
      colleges,
      compareIds,
      setCompareIds,
      toggleCompare,
      clearCompare,
      importColleges,
      resetToSeed,
      lastImportAt,
    }),
    [
      colleges,
      compareIds,
      setCompareIds,
      toggleCompare,
      clearCompare,
      importColleges,
      resetToSeed,
      lastImportAt,
    ]
  );

  return (
    <CollegeDataContext.Provider value={value}>
      {children}
    </CollegeDataContext.Provider>
  );
}

export function useCollegeData() {
  const ctx = useContext(CollegeDataContext);
  if (!ctx) {
    throw new Error("useCollegeData must be used within CollegeDataProvider");
  }
  return ctx;
}
