import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CareerRecommendation, StudentProfile } from "../types/student";
import { defaultProfile } from "../types/student";
import { generateRecommendations } from "../data/careerPaths";

const STORAGE_KEY = "future-route-profile";

interface StudentContextValue {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
  updateProfile: (partial: Partial<StudentProfile>) => void;
  recommendations: CareerRecommendation[];
  hasProfile: boolean;
  clearProfile: () => void;
}

const StudentContext = createContext<StudentContextValue | null>(null);

function loadProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...defaultProfile };
}

function isProfileComplete(p: StudentProfile): boolean {
  return (
    p.careerGoals.trim().length > 0 &&
    (p.interests.length > 0 || p.skills.length > 0 || p.favoriteSubjects.length > 0)
  );
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<StudentProfile>(loadProfile);

  const setProfile = useCallback((p: StudentProfile) => {
    setProfileState(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }, []);

  const updateProfile = useCallback((partial: Partial<StudentProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState({ ...defaultProfile });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const recommendations = useMemo(() => {
    if (!isProfileComplete(profile)) return [];
    return generateRecommendations(profile);
  }, [profile]);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      updateProfile,
      recommendations,
      hasProfile: isProfileComplete(profile),
      clearProfile,
    }),
    [profile, setProfile, updateProfile, recommendations, clearProfile]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within StudentProvider");
  return ctx;
}
