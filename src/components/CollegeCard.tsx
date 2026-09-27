import { Link } from "react-router-dom";
import { Building2, ExternalLink, MapPin, Users } from "lucide-react";
import type { College } from "../types/college";
import {
  getBranchNames,
  getHostelFee,
  getRepresentativeAnnualFee,
  getRepresentativeTotalFee,
  getTotalSeats,
} from "../lib/collegeUtils";
import { displayFee, displayNumeric } from "../lib/format";
import { TypeBadge } from "./TypeBadge";

interface CollegeCardProps {
  college: College;
  compareSelected?: boolean;
  onToggleCompare?: () => void;
}

export function CollegeCard({
  college,
  compareSelected,
  onToggleCompare,
}: CollegeCardProps) {
  const annual = getRepresentativeAnnualFee(college);
  const total = getRepresentativeTotalFee(college);
  const hostel = getHostelFee(college);
  const seats = getTotalSeats(college);
  const branches = getBranchNames(college);

  return (
    <article className="card-shadow flex flex-col rounded-xl border border-slate-200/80 bg-card p-5 transition hover:border-brand-200">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <Link
            to={`/college/${college.id}`}
            className="font-semibold text-ink hover:text-brand-600"
          >
            {college.name}
          </Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {college.city}, {college.district}
          </p>
        </div>
        <TypeBadge type={college.type} />
      </div>

      <p className="mb-3 line-clamp-2 text-sm text-slate-600">
        <span className="font-medium text-slate-700">Branches: </span>
        {branches.length > 0 ? branches.join(", ") : "Data not available"}
      </p>

      <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted">Total seats</dt>
          <dd className="flex items-center gap-1 font-medium">
            <Users className="h-3.5 w-3.5 text-muted" aria-hidden />
            {displayNumeric({ value: seats, source: college.officialSources[0] })}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Annual tuition</dt>
          <dd className="font-medium">{displayFee({ value: annual, source: college.officialSources[0] })}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">4-year course fee</dt>
          <dd className="font-medium">{displayFee({ value: total, source: college.officialSources[0] })}</dd>
        </div>
        <div className="col-span-2 sm:col-span-3">
          <dt className="text-xs text-muted">Hostel (if available)</dt>
          <dd className="font-medium">
            {hostel != null
              ? displayFee({ value: hostel, source: college.officialSources[0] })
              : "Data not available"}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <Link
          to={`/college/${college.id}`}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          View details
        </Link>
        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Official site
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        {onToggleCompare && (
          <button
            type="button"
            onClick={onToggleCompare}
            className={`ml-auto rounded-lg border px-3 py-1.5 text-sm ${
              compareSelected
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {compareSelected ? "In compare" : "Compare"}
          </button>
        )}
      </div>
    </article>
  );
}

export function CollegeCardCompact({ college }: { college: College }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Building2 className="h-4 w-4 text-muted" aria-hidden />
      <span className="font-medium">{college.shortName ?? college.name}</span>
      <TypeBadge type={college.type} />
    </div>
  );
}
