import type { College } from "../types/college";
import {
  getAnnualTuitionRange,
  getRepresentativeAnnualFee,
  getTotalSeats,
} from "./collegeUtils";

export interface DashboardStats {
  totalColleges: number;
  totalBranches: number;
  totalSeats: number | null;
  lowestFeeCollege: { name: string; fee: number } | null;
  highestFeeCollege: { name: string; fee: number } | null;
}

export function computeStats(colleges: College[]): DashboardStats {
  const branchSet = new Set<string>();
  let seatSum = 0;
  let hasSeatData = false;

  for (const c of colleges) {
    for (const b of c.branches) {
      branchSet.add(`${c.id}:${b.branchCode}`);
      if (b.seats.value != null) {
        seatSum += b.seats.value;
        hasSeatData = true;
      }
    }
  }

  let lowest: { name: string; fee: number } | null = null;
  let highest: { name: string; fee: number } | null = null;

  for (const c of colleges) {
    const fee = getRepresentativeAnnualFee(c);
    if (fee == null) continue;
    if (!lowest || fee < lowest.fee) lowest = { name: c.name, fee };
    if (!highest || fee > highest.fee) highest = { name: c.name, fee };
  }

  let totalSeatsFromColleges = 0;
  let anyCollegeSeats = false;
  for (const c of colleges) {
    const t = getTotalSeats(c);
    if (t != null) {
      totalSeatsFromColleges += t;
      anyCollegeSeats = true;
    }
  }

  return {
    totalColleges: colleges.length,
    totalBranches: branchSet.size,
    totalSeats: hasSeatData
      ? seatSum
      : anyCollegeSeats
        ? totalSeatsFromColleges
        : null,
    lowestFeeCollege: lowest,
    highestFeeCollege: highest,
  };
}

export function getUniqueCities(colleges: College[]): string[] {
  return [...new Set(colleges.map((c) => c.city))].sort();
}

export function getUniqueDistricts(colleges: College[]): string[] {
  return [...new Set(colleges.map((c) => c.district))].sort();
}

export function getAllBranchCodes(colleges: College[]): string[] {
  const codes = new Set<string>();
  for (const c of colleges) {
    for (const b of c.branches) codes.add(b.branchCode);
  }
  return [...codes].sort();
}
