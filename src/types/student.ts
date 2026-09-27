export type EducationLevel =
  | "class-10"
  | "class-12"
  | "diploma"
  | "college-ug"
  | "college-pg"
  | "graduate";

export type Stream =
  | "science-pcm"
  | "science-pcb"
  | "commerce"
  | "arts"
  | "vocational"
  | "diploma"
  | "other";

export type LearningStyle =
  | "visual"
  | "hands-on"
  | "reading"
  | "mixed"
  | "online-only";

export type BudgetPreference = "free" | "low" | "medium" | "high" | "any";

export type LocationPreference = "india" | "abroad" | "both" | "online";

export interface StudentProfile {
  educationLevel: EducationLevel;
  stream: Stream;
  favoriteSubjects: string[];
  interests: string[];
  skills: string[];
  careerGoals: string;
  learningStyle: LearningStyle;
  budget: BudgetPreference;
  location: LocationPreference;
  examPreferences: string[];
}

export const defaultProfile: StudentProfile = {
  educationLevel: "class-12",
  stream: "science-pcm",
  favoriteSubjects: [],
  interests: [],
  skills: [],
  careerGoals: "",
  learningStyle: "mixed",
  budget: "any",
  location: "india",
  examPreferences: [],
};

export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchScore: number;
  matchReasons: string[];
  courses: string[];
  requiredSkills: string[];
  entranceExams: string[];
  roadmap: RoadmapStage[];
  freeResources: string[];
  paidResources: string[];
  estimatedTime: string;
  difficulty: "Beginner-friendly" | "Moderate" | "Challenging";
  careerScope: string;
  salaryRange: string;
  field: string;
}
