import { Link } from "react-router-dom";
import { useCollegeData } from "../context/CollegeDataContext";
import { PageHeader } from "../components/PageHeader";
import { TypeBadge } from "../components/TypeBadge";
import { findCollegeById } from "../lib/collegeUtils";
import {
  getBranchNames,
  getHostelFee,
  getRepresentativeAnnualFee,
  getRepresentativeTotalFee,
  getTotalSeats,
} from "../lib/collegeUtils";
import { displayFee, displayNumeric } from "../lib/format";

const ROWS = [
  { key: "location", label: "Location" },
  { key: "type", label: "Type" },
  { key: "branches", label: "Branches" },
  { key: "seats", label: "Total seats" },
  { key: "annual", label: "Annual tuition" },
  { key: "total", label: "4-year course fee" },
  { key: "hostel", label: "Hostel fee" },
  { key: "cutoff", label: "Cutoff" },
  { key: "placement", label: "Placement" },
  { key: "admission", label: "Admission mode" },
] as const;

export function ComparePage() {
  const { colleges, compareIds, clearCompare, setCompareIds } =
    useCollegeData();

  const selected = compareIds
    .map((id) => findCollegeById(colleges, id))
    .filter(Boolean);

  const remove = (id: string) =>
    setCompareIds(compareIds.filter((x) => x !== id));

  function cellValue(
    college: NonNullable<(typeof selected)[0]>,
    key: (typeof ROWS)[number]["key"]
  ): string {
    switch (key) {
      case "location":
        return `${college.city}, ${college.district}`;
      case "type":
        return college.type;
      case "branches":
        return getBranchNames(college).join(", ") || "Data not available";
      case "seats":
        return displayNumeric({
          value: getTotalSeats(college),
          source: college.officialSources[0],
        });
      case "annual":
        return displayFee({
          value: getRepresentativeAnnualFee(college),
          source: college.officialSources[0],
        });
      case "total":
        return displayFee({
          value: getRepresentativeTotalFee(college),
          source: college.officialSources[0],
        });
      case "hostel": {
        const h = getHostelFee(college);
        return h != null
          ? displayFee({ value: h, source: college.officialSources[0] })
          : "Data not available";
      }
      case "cutoff": {
        const c = college.branches.flatMap((b) => b.cutoffs ?? [])[0];
        if (!c) return "Data not available";
        if (c.closingRank != null) return `Closing rank ${c.closingRank}`;
        return "Data not available";
      }
      case "placement":
        return college.placement?.notes ?? "Data not available";
      case "admission": {
        const modes = [
          ...new Set(
            college.branches
              .map((b) => b.admissionMode)
              .filter(Boolean) as string[]
          ),
        ];
        return modes.length ? modes.join(", ") : "Data not available";
      }
      default:
        return "";
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        title="Compare Colleges"
        description="Compare up to 4 colleges side by side. Add colleges from the explorer or detail pages."
      >
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="text-sm text-brand-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </PageHeader>

      {selected.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-muted">No colleges selected for comparison.</p>
          <Link
            to="/colleges"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white"
          >
            Browse colleges
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-card">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-3 text-left text-xs uppercase text-muted">
                  Criteria
                </th>
                {selected.map((c) => (
                  <th key={c.id} className="min-w-[180px] px-4 py-3 text-left">
                    <Link
                      to={`/college/${c.id}`}
                      className="font-semibold text-brand-600 hover:underline"
                    >
                      {c.shortName ?? c.name}
                    </Link>
                    <div className="mt-1">
                      <TypeBadge type={c.type} />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(c.id)}
                      className="mt-2 text-xs text-muted hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </th>
                ))}
                {selected.length < 4 &&
                  Array.from({ length: 4 - selected.length }).map((_, i) => (
                    <th
                      key={`empty-${i}`}
                      className="min-w-[140px] px-4 py-3 text-left text-xs text-muted"
                    >
                      <Link to="/colleges" className="hover:text-brand-600">
                        + Add college
                      </Link>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {row.label}
                  </td>
                  {selected.map((c) => (
                    <td key={c.id} className="px-4 py-3 align-top">
                      {row.key === "type" ? (
                        <TypeBadge type={c.type} />
                      ) : (
                        cellValue(c, row.key)
                      )}
                    </td>
                  ))}
                  {selected.length < 4 &&
                    Array.from({ length: 4 - selected.length }).map((_, i) => (
                      <td key={`e-${row.key}-${i}`} className="px-4 py-3" />
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Compare up to 4 colleges. Fees and seats reflect uploaded/seed data with
        official sources only.
      </p>
    </div>
  );
}
