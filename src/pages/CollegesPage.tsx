import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCollegeData } from "../context/CollegeDataContext";
import { CollegeCard } from "../components/CollegeCard";
import {
  FilterPanel,
  EMPTY_FILTERS,
  type CollegeFilters,
} from "../components/FilterPanel";
import { PageHeader } from "../components/PageHeader";
import { applyCollegeFilters } from "../lib/applyFilters";
import {
  getAllBranchCodes,
  getUniqueCities,
  getUniqueDistricts,
} from "../lib/stats";
import type { CollegeType } from "../types/college";

export function CollegesPage() {
  const { colleges, compareIds, toggleCompare } = useCollegeData();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [filters, setFilters] = useState<CollegeFilters>(() => {
    const type = params.get("type") as CollegeType | null;
    return type ? { ...EMPTY_FILTERS, types: [type] } : EMPTY_FILTERS;
  });

  useEffect(() => {
    const q = params.get("q");
    if (q) setSearch(q);
    const type = params.get("type") as CollegeType | null;
    if (type) setFilters((f) => ({ ...f, types: [type] }));
  }, [params]);

  const cities = useMemo(() => getUniqueCities(colleges), [colleges]);
  const districts = useMemo(() => getUniqueDistricts(colleges), [colleges]);
  const branches = useMemo(() => getAllBranchCodes(colleges), [colleges]);

  const filtered = useMemo(
    () => applyCollegeFilters(colleges, filters, search),
    [colleges, filters, search]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        title="College Explorer"
        description="Browse engineering colleges in Madhya Pradesh. Every fee and seat count must include an official source — missing data is shown honestly."
      />

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, city, or branch…"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm sm:max-w-md"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          cities={cities}
          districts={districts}
          branches={branches}
        />

        <div>
          <p className="mb-4 text-sm text-muted">
            Showing {filtered.length} of {colleges.length} colleges
          </p>
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-muted">
              No colleges match your filters. Try clearing filters or upload more
              data on the Data page.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((c) => (
                <CollegeCard
                  key={c.id}
                  college={c}
                  compareSelected={compareIds.includes(c.id)}
                  onToggleCompare={() => toggleCompare(c.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
