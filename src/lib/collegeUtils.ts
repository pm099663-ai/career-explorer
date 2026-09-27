import type { BranchOffering, College, CollegeType } from "../types/college";

export function getTotalSeats(college: College): number | null {
  let total = 0;
  let hasAny = false;
  for (const b of college.branches) {
    if (b.seats.value != null) {
      total += b.seats.value;
      hasAny = true;
    }
  }
  return hasAny ? total : null;
}

export function getAnnualTuitionRange(college: College): {
  min: number | null;
  max: number | null;
} {
  const fees = college.branches
    .map((b) => b.fee.annualTuition.value)
    .filter((v): v is number => v != null);
  if (fees.length === 0) return { min: null, max: null };
  return { min: Math.min(...fees), max: Math.max(...fees) };
}

export function getTotalCourseFeeRange(college: College): {
  min: number | null;
  max: number | null;
} {
  const fees = college.branches
    .map((b) => b.fee.totalFourYear.value)
    .filter((v): v is number => v != null);
  if (fees.length === 0) return { min: null, max: null };
  return { min: Math.min(...fees), max: Math.max(...fees) };
}

export function getRepresentativeAnnualFee(college: College): number | null {
  const { min } = getAnnualTuitionRange(college);
  return min;
}

export function getRepresentativeTotalFee(college: College): number | null {
  const { min } = getTotalCourseFeeRange(college);
  return min;
}

export function getHostelFee(college: College): number | null {
  for (const b of college.branches) {
    if (b.fee.hostel?.value != null) return b.fee.hostel.value;
  }
  return null;
}

export function getBranchNames(college: College): string[] {
  return college.branches.map((b) => b.branchName);
}

export function getBranchCodes(college: College): string[] {
  return college.branches.map((b) => b.branchCode);
}

export function collegeMatchesSearch(college: College, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (college.name.toLowerCase().includes(q)) return true;
  if (college.city.toLowerCase().includes(q)) return true;
  if (college.district.toLowerCase().includes(q)) return true;
  if (college.shortName?.toLowerCase().includes(q)) return true;
  return college.branches.some(
    (b) =>
      b.branchName.toLowerCase().includes(q) ||
      b.branchCode.toLowerCase().includes(q)
  );
}

export function collegeMatchesType(
  college: College,
  types: CollegeType[]
): boolean {
  if (types.length === 0) return true;
  return types.includes(college.type);
}

export function getBranchOffering(
  college: College,
  branchCode: string
): BranchOffering | undefined {
  return college.branches.find(
    (b) => b.branchCode.toUpperCase() === branchCode.toUpperCase()
  );
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findCollegeById(
  colleges: College[],
  id: string
): College | undefined {
  return colleges.find((c) => c.id === id);
}
