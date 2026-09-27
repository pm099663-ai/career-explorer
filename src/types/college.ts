export type CollegeType =
  | "IIT"
  | "NIT"
  | "IIIT"
  | "Government"
  | "Private"
  | "AICTE-Approved";

export type AdmissionMode =
  | "JoSAA"
  | "CSAB"
  | "MP DTE"
  | "Institute"
  | "State Counselling"
  | "Other";

export interface DataSource {
  sourceName: string;
  sourceUrl: string;
  lastUpdated: string; // ISO date YYYY-MM-DD
}

export interface NumericWithSource {
  value: number | null;
  source: DataSource;
}

export interface FeeBreakdown {
  annualTuition: NumericWithSource;
  semesterWise?: { semester: number; amount: NumericWithSource }[];
  totalFourYear: NumericWithSource;
  hostel?: NumericWithSource;
  examFee?: NumericWithSource;
  cautionMoney?: NumericWithSource;
  developmentFee?: NumericWithSource;
  otherCharges?: { label: string; amount: NumericWithSource }[];
}

export interface CategorySeats {
  category: string;
  seats: NumericWithSource;
}

export interface BranchOffering {
  branchCode: string;
  branchName: string;
  seats: NumericWithSource;
  fee: FeeBreakdown;
  admissionMode: AdmissionMode | null;
  cutoffs?: {
    year: number;
    exam: string;
    category: string;
    openingRank?: number | null;
    closingRank?: number | null;
    openingPercentile?: number | null;
    closingPercentile?: number | null;
    source: DataSource;
  }[];
}

export interface PlacementInfo {
  averagePackageLpa?: NumericWithSource;
  highestPackageLpa?: NumericWithSource;
  placementRatePercent?: NumericWithSource;
  topRecruiters?: string[];
  notes?: string;
}

export interface College {
  id: string;
  name: string;
  shortName?: string;
  city: string;
  district: string;
  state: string;
  type: CollegeType;
  aicteApproved: boolean;
  website: string;
  overview?: string;
  admissionProcess?: string;
  branches: BranchOffering[];
  placement?: PlacementInfo;
  scholarships?: string[];
  feeWaivers?: string[];
  officialSources: DataSource[];
}

export interface CompareSlot {
  collegeId: string;
}

export const BRANCH_CATALOG: { code: string; name: string }[] = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "IT", name: "Information Technology" },
  { code: "AIML", name: "AI & Machine Learning" },
  { code: "DS", name: "Data Science" },
  { code: "CYBER", name: "Cyber Security" },
  { code: "ECE", name: "Electronics & Communication" },
  { code: "EE", name: "Electrical Engineering" },
  { code: "ME", name: "Mechanical Engineering" },
  { code: "CE", name: "Civil Engineering" },
  { code: "CHE", name: "Chemical Engineering" },
  { code: "AUTO", name: "Automobile Engineering" },
  { code: "IE", name: "Industrial Engineering" },
  { code: "META", name: "Metallurgical Engineering" },
  { code: "BIOTECH", name: "Biotechnology" },
  { code: "CIVIL-INFRA", name: "Civil & Infrastructure" },
  { code: "MECHATRONICS", name: "Mechatronics" },
];

export const COLLEGE_TYPE_LABELS: Record<CollegeType, string> = {
  IIT: "IIT",
  NIT: "NIT",
  IIIT: "IIIT",
  Government: "Government",
  Private: "Private",
  "AICTE-Approved": "AICTE-Approved",
};
