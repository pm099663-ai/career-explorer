import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCollegeData } from "../context/CollegeDataContext";
import { PageHeader } from "../components/PageHeader";
import { TypeBadge } from "../components/TypeBadge";
import { SourceLine } from "../components/SourceBadge";
import { BRANCH_CATALOG } from "../types/college";
import { getBranchOffering } from "../lib/collegeUtils";
import { displayFee, displayNumeric } from "../lib/format";

export function BranchesPage() {
  const { colleges } = useCollegeData();
  const [selected, setSelected] = useState(BRANCH_CATALOG[0].code);

  const offerings = useMemo(() => {
    return colleges
      .map((college) => {
        const branch = getBranchOffering(college, selected);
        if (!branch) return null;
        return { college, branch };
      })
      .filter(Boolean) as {
      college: (typeof colleges)[0];
      branch: NonNullable<ReturnType<typeof getBranchOffering>>;
    }[];
  }, [colleges, selected]);

  const branchMeta = BRANCH_CATALOG.find((b) => b.code === selected);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        title="Branch-wise Seat & Fee Explorer"
        description="Select a branch to see which MP colleges offer it, along with seats, fees, admission mode, and cutoffs when available."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {BRANCH_CATALOG.map((b) => (
          <button
            key={b.code}
            type="button"
            onClick={() => setSelected(b.code)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              selected === b.code
                ? "border-brand-500 bg-brand-600 text-white"
                : "border-slate-200 bg-card text-slate-700 hover:border-brand-200"
            }`}
          >
            {b.code}
          </button>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">
        {branchMeta?.name ?? selected}
        <span className="ml-2 text-sm font-normal text-muted">
          ({offerings.length} colleges)
        </span>
      </h2>

      {offerings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-muted">
          No colleges in the current dataset offer this branch. Add colleges via
          the Data page.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Annual fee</th>
                <th className="px-4 py-3">4-year fee</th>
                <th className="px-4 py-3">Admission</th>
                <th className="px-4 py-3">Cutoff</th>
              </tr>
            </thead>
            <tbody>
              {offerings.map(({ college, branch }) => {
                const cutoff = branch.cutoffs?.[0];
                const cutoffText =
                  cutoff?.closingRank != null
                    ? `Closing rank ${cutoff.closingRank}`
                    : cutoff?.closingPercentile != null
                      ? `Closing ${cutoff.closingPercentile}%`
                      : "Data not available";

                return (
                  <tr
                    key={college.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to={`/college/${college.id}`}
                        className="font-medium text-brand-600 hover:underline"
                      >
                        {college.shortName ?? college.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{college.city}</td>
                    <td className="px-4 py-3">
                      <TypeBadge type={college.type} />
                    </td>
                    <td className="px-4 py-3">
                      {displayNumeric(branch.seats)}
                    </td>
                    <td className="px-4 py-3">
                      {displayFee(branch.fee.annualTuition)}
                    </td>
                    <td className="px-4 py-3">
                      {displayFee(branch.fee.totalFourYear)}
                    </td>
                    <td className="px-4 py-3">
                      {branch.admissionMode ?? "Data not available"}
                    </td>
                    <td className="px-4 py-3 text-xs">{cutoffText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {offerings[0] && (
        <div className="mt-4">
          <SourceLine source={offerings[0].branch.seats.source} />
        </div>
      )}
    </div>
  );
}
