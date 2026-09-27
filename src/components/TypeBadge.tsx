import type { CollegeType } from "../types/college";
import { COLLEGE_TYPE_LABELS } from "../types/college";

const STYLES: Record<CollegeType, string> = {
  IIT: "bg-amber-100 text-amber-900 border-amber-200",
  NIT: "bg-blue-100 text-blue-900 border-blue-200",
  IIIT: "bg-violet-100 text-violet-900 border-violet-200",
  Government: "bg-emerald-100 text-emerald-900 border-emerald-200",
  Private: "bg-rose-100 text-rose-900 border-rose-200",
  "AICTE-Approved": "bg-slate-100 text-slate-800 border-slate-200",
};

export function TypeBadge({ type }: { type: CollegeType }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[type]}`}
    >
      {COLLEGE_TYPE_LABELS[type]}
    </span>
  );
}
