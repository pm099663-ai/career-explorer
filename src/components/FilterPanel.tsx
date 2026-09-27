import type { CollegeType, AdmissionMode } from "../types/college";
import { COLLEGE_TYPE_LABELS } from "../types/college";

export interface CollegeFilters {
  types: CollegeType[];
  city: string;
  district: string;
  branch: string;
  seatMin: string;
  seatMax: string;
  feeMin: string;
  feeMax: string;
  totalFeeMin: string;
  totalFeeMax: string;
  admissionMode: AdmissionMode | "";
}

export const EMPTY_FILTERS: CollegeFilters = {
  types: [],
  city: "",
  district: "",
  branch: "",
  seatMin: "",
  seatMax: "",
  feeMin: "",
  feeMax: "",
  totalFeeMin: "",
  totalFeeMax: "",
  admissionMode: "",
};

const TYPES = Object.keys(COLLEGE_TYPE_LABELS) as CollegeType[];

const ADMISSION_MODES: AdmissionMode[] = [
  "JoSAA",
  "CSAB",
  "MP DTE",
  "Institute",
  "State Counselling",
  "Other",
];

interface FilterPanelProps {
  filters: CollegeFilters;
  onChange: (f: CollegeFilters) => void;
  cities: string[];
  districts: string[];
  branches: string[];
}

export function FilterPanel({
  filters,
  onChange,
  cities,
  districts,
  branches,
}: FilterPanelProps) {
  const set = (partial: Partial<CollegeFilters>) =>
    onChange({ ...filters, ...partial });

  const toggleType = (t: CollegeType) => {
    const types = filters.types.includes(t)
      ? filters.types.filter((x) => x !== t)
      : [...filters.types, t];
    set({ types });
  };

  return (
    <aside className="card-shadow rounded-xl border border-slate-200/80 bg-card p-4 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-ink">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(EMPTY_FILTERS)}
          className="text-xs text-brand-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <fieldset className="mb-4">
        <legend className="mb-2 text-xs font-medium uppercase text-muted">
          College type
        </legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleType(t)}
              className={`rounded-full border px-2.5 py-1 text-xs ${
                filters.types.includes(t)
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {COLLEGE_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mb-3 block text-sm">
        <span className="mb-1 block text-xs text-muted">City</span>
        <select
          value={filters.city}
          onChange={(e) => set({ city: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-3 block text-sm">
        <span className="mb-1 block text-xs text-muted">District</span>
        <select
          value={filters.district}
          onChange={(e) => set({ district: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">All districts</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-3 block text-sm">
        <span className="mb-1 block text-xs text-muted">Branch</span>
        <select
          value={filters.branch}
          onChange={(e) => set({ branch: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">All branches</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-3 block text-sm">
        <span className="mb-1 block text-xs text-muted">Admission mode</span>
        <select
          value={filters.admissionMode}
          onChange={(e) =>
            set({ admissionMode: e.target.value as AdmissionMode | "" })
          }
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          {ADMISSION_MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mb-3">
        <legend className="mb-1 text-xs text-muted">Seat range</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.seatMin}
            onChange={(e) => set({ seatMin: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.seatMax}
            onChange={(e) => set({ seatMax: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
        </div>
      </fieldset>

      <fieldset className="mb-3">
        <legend className="mb-1 text-xs text-muted">Annual fee (₹)</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.feeMin}
            onChange={(e) => set({ feeMin: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.feeMax}
            onChange={(e) => set({ feeMax: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-xs text-muted">4-year fee (₹)</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.totalFeeMin}
            onChange={(e) => set({ totalFeeMin: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.totalFeeMax}
            onChange={(e) => set({ totalFeeMax: e.target.value })}
            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
        </div>
      </fieldset>
    </aside>
  );
}
