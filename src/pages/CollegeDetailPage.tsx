import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useCollegeData } from "../context/CollegeDataContext";
import { TypeBadge } from "../components/TypeBadge";
import { SourceBadge, SourceLine } from "../components/SourceBadge";
import { findCollegeById } from "../lib/collegeUtils";
import { displayFee, displayNumeric } from "../lib/format";

export function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { colleges, toggleCompare, compareIds } = useCollegeData();
  const college = id ? findCollegeById(colleges, id) : undefined;

  if (!college) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-muted">College not found.</p>
        <Link to="/colleges" className="mt-4 inline-block text-brand-600">
          Back to explorer
        </Link>
      </div>
    );
  }

  const inCompare = compareIds.includes(college.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/colleges"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All colleges
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">
            {college.name}
          </h1>
          <TypeBadge type={college.type} />
        </div>
        <p className="mt-2 text-muted">
          {college.city}, {college.district}, {college.state}
          {college.aicteApproved && " · AICTE-approved"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Official website
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => toggleCompare(college.id)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            {inCompare ? "Remove from compare" : "Add to compare"}
          </button>
        </div>
      </header>

      <section className="mb-8 rounded-xl border border-slate-200 bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Overview</h2>
        <p className="text-sm text-slate-700">
          {college.overview ?? "Data not available"}
        </p>
        {college.admissionProcess && (
          <>
            <h3 className="mb-2 mt-6 font-medium">Admission process</h3>
            <p className="text-sm text-slate-700">{college.admissionProcess}</p>
          </>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Branch-wise seat matrix</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Seats</th>
                <th className="px-4 py-3">Annual tuition</th>
                <th className="px-4 py-3">4-year fee</th>
                <th className="px-4 py-3">Hostel</th>
                <th className="px-4 py-3">Admission</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {college.branches.map((b) => (
                <tr key={b.branchCode} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium">{b.branchName}</td>
                  <td className="px-4 py-3">{displayNumeric(b.seats)}</td>
                  <td className="px-4 py-3">
                    {displayFee(b.fee.annualTuition)}
                  </td>
                  <td className="px-4 py-3">
                    {displayFee(b.fee.totalFourYear)}
                  </td>
                  <td className="px-4 py-3">
                    {b.fee.hostel
                      ? displayFee(b.fee.hostel)
                      : "Data not available"}
                  </td>
                  <td className="px-4 py-3">
                    {b.admissionMode ?? "Data not available"}
                  </td>
                  <td className="px-4 py-3">
                    <SourceBadge source={b.seats.source} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {college.branches.some((b) => b.cutoffs?.length) && (
        <section className="mb-8 rounded-xl border border-slate-200 bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Previous year cutoff / rank
          </h2>
          <div className="space-y-4">
            {college.branches.map((b) =>
              b.cutoffs?.map((c, i) => (
                <div
                  key={`${b.branchCode}-${i}`}
                  className="rounded-lg border border-slate-100 p-4 text-sm"
                >
                  <p className="font-medium">
                    {b.branchName} · {c.year} · {c.exam} · {c.category}
                  </p>
                  <p className="mt-1 text-muted">
                    Opening rank:{" "}
                    {c.openingRank ?? "Data not available"} · Closing rank:{" "}
                    {c.closingRank ?? "Data not available"}
                  </p>
                  <div className="mt-2">
                    <SourceLine source={c.source} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold">Other charges</h2>
          <ul className="space-y-2 text-sm">
            {college.branches[0]?.fee.examFee && (
              <li>
                Exam fee: {displayFee(college.branches[0].fee.examFee)}
              </li>
            )}
            {college.branches[0]?.fee.cautionMoney && (
              <li>
                Caution money:{" "}
                {displayFee(college.branches[0].fee.cautionMoney)}
              </li>
            )}
            {college.branches[0]?.fee.developmentFee && (
              <li>
                Development fee:{" "}
                {displayFee(college.branches[0].fee.developmentFee)}
              </li>
            )}
            {!college.branches.some(
              (b) =>
                b.fee.examFee?.value != null ||
                b.fee.cautionMoney?.value != null ||
                b.fee.developmentFee?.value != null
            ) && (
              <li className="text-muted">Data not available</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold">
            Scholarships & fee waivers
          </h2>
          {college.scholarships?.length ? (
            <ul className="list-inside list-disc text-sm text-slate-700">
              {college.scholarships.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Data not available</p>
          )}
          {college.feeWaivers?.length ? (
            <ul className="mt-3 list-inside list-disc text-sm">
              {college.feeWaivers.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-slate-200 bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Placement details</h2>
        {college.placement ? (
          <div className="text-sm text-slate-700">
            {college.placement.averagePackageLpa && (
              <p>
                Average package:{" "}
                {displayNumeric(college.placement.averagePackageLpa)} LPA
              </p>
            )}
            {college.placement.highestPackageLpa && (
              <p>
                Highest package:{" "}
                {displayNumeric(college.placement.highestPackageLpa)} LPA
              </p>
            )}
            {college.placement.placementRatePercent && (
              <p>
                Placement rate:{" "}
                {displayNumeric(college.placement.placementRatePercent)}%
              </p>
            )}
            {college.placement.topRecruiters?.length ? (
              <p className="mt-2">
                Recruiters: {college.placement.topRecruiters.join(", ")}
              </p>
            ) : null}
            {college.placement.notes && (
              <p className="mt-2 text-muted">{college.placement.notes}</p>
            )}
            {!college.placement.averagePackageLpa &&
              !college.placement.notes && (
                <p className="text-muted">Data not available</p>
              )}
          </div>
        ) : (
          <p className="text-sm text-muted">Data not available</p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold">Official sources</h2>
        <ul className="flex flex-wrap gap-2">
          {college.officialSources.map((s) => (
            <li key={s.sourceUrl}>
              <SourceBadge source={s} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
