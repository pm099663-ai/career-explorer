import type { College } from "../types/college";
import type { CollegeFilters } from "../components/FilterPanel";
import {
  collegeMatchesSearch,
  collegeMatchesType,
  getRepresentativeAnnualFee,
  getRepresentativeTotalFee,
  getTotalSeats,
} from "./collegeUtils";

function parseNum(s: string): number | null {
  if (!s.trim()) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function applyCollegeFilters(
  colleges: College[],
  filters: CollegeFilters,
  search: string
): College[] {
  return colleges.filter((c) => {
    if (!collegeMatchesSearch(c, search)) return false;
    if (!collegeMatchesType(c, filters.types)) return false;
    if (filters.city && c.city !== filters.city) return false;
    if (filters.district && c.district !== filters.district) return false;

    if (filters.branch) {
      const has = c.branches.some((b) => b.branchCode === filters.branch);
      if (!has) return false;
    }

    if (filters.admissionMode) {
      const has = c.branches.some(
        (b) => b.admissionMode === filters.admissionMode
      );
      if (!has) return false;
    }

    const seats = getTotalSeats(c);
    const seatMin = parseNum(filters.seatMin);
    const seatMax = parseNum(filters.seatMax);
    if (seatMin != null || seatMax != null) {
      if (seats == null) return false;
      if (seatMin != null && seats < seatMin) return false;
      if (seatMax != null && seats > seatMax) return false;
    }

    const annual = getRepresentativeAnnualFee(c);
    const feeMin = parseNum(filters.feeMin);
    const feeMax = parseNum(filters.feeMax);
    if (feeMin != null || feeMax != null) {
      if (annual == null) return false;
      if (feeMin != null && annual < feeMin) return false;
      if (feeMax != null && annual > feeMax) return false;
    }

    const total = getRepresentativeTotalFee(c);
    const totalMin = parseNum(filters.totalFeeMin);
    const totalMax = parseNum(filters.totalFeeMax);
    if (totalMin != null || totalMax != null) {
      if (total == null) return false;
      if (totalMin != null && total < totalMin) return false;
      if (totalMax != null && total > totalMax) return false;
    }

    return true;
  });
}
