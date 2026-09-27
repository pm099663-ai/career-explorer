import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { useCollegeData } from "../context/CollegeDataContext";
import { PageHeader } from "../components/PageHeader";
import { SEED_COLLEGES } from "../data/seedColleges";
import type { College } from "../types/college";

const SAMPLE_JSON = `[
  {
    "id": "example-college",
    "name": "Example Engineering College",
    "city": "Bhopal",
    "district": "Bhopal",
    "state": "Madhya Pradesh",
    "type": "Private",
    "aicteApproved": true,
    "website": "https://example.ac.in/",
    "officialSources": [{
      "sourceName": "MP DTE",
      "sourceUrl": "https://dte.mponline.gov.in/",
      "lastUpdated": "2025-05-01"
    }],
    "branches": [{
      "branchCode": "CSE",
      "branchName": "Computer Science & Engineering",
      "seats": { "value": 60, "source": { "sourceName": "MP DTE", "sourceUrl": "https://dte.mponline.gov.in/", "lastUpdated": "2025-05-01" }},
      "fee": {
        "annualTuition": { "value": 85000, "source": { "sourceName": "College fee notification", "sourceUrl": "https://example.ac.in/fees", "lastUpdated": "2025-04-01" }},
        "totalFourYear": { "value": 340000, "source": { "sourceName": "College fee notification", "sourceUrl": "https://example.ac.in/fees", "lastUpdated": "2025-04-01" }}
      },
      "admissionMode": "MP DTE"
    }]
  }
]`;

export function AdminPage() {
  const { colleges, importColleges, resetToSeed, lastImportAt } =
    useCollegeData();
  const [message, setMessage] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);
  const [mergeMode, setMergeMode] = useState<"merge" | "replace">("merge");

  const handleFile = async (file: File) => {
    setMessage(null);
    try {
      const text = await file.text();
      let data: College[];
      if (file.name.endsWith(".csv")) {
        setMessage({
          type: "error",
          text: "CSV upload: export your sheet as JSON with the schema below, or use JSON directly. Full CSV parser can be added when column format is fixed.",
        });
        return;
      }
      data = JSON.parse(text) as College[];
      if (!Array.isArray(data)) throw new Error("Root must be an array");
      validateColleges(data);
      importColleges(data, mergeMode);
      setMessage({
        type: "ok",
        text: `Imported ${data.length} college record(s) (${mergeMode}).`,
      });
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Invalid file",
      });
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(colleges, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mp-engineering-colleges.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    try {
      const data = JSON.parse(SAMPLE_JSON) as College[];
      importColleges(data, "merge");
      setMessage({ type: "ok", text: "Sample record merged (for schema reference)." });
    } catch {
      setMessage({ type: "error", text: "Sample load failed" });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        title="Data / Admin"
        description="Upload official college, branch, seat, fee, cutoff, and hostel data. Every numeric field must include sourceName, sourceUrl, and lastUpdated. Leave value null when unknown — never use estimates."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card-shadow rounded-xl border bg-card p-4">
          <p className="text-2xl font-semibold">{colleges.length}</p>
          <p className="text-sm text-muted">Colleges in database</p>
        </div>
        <div className="card-shadow rounded-xl border bg-card p-4">
          <p className="text-sm font-medium">Seed colleges</p>
          <p className="text-2xl font-semibold">{SEED_COLLEGES.length}</p>
        </div>
        <div className="card-shadow rounded-xl border bg-card p-4">
          <p className="text-sm text-muted">Last import</p>
          <p className="font-medium">
            {lastImportAt
              ? new Date(lastImportAt).toLocaleString("en-IN")
              : "—"}
          </p>
        </div>
      </div>

      <section className="mb-8 rounded-xl border border-slate-200 bg-card p-6">
        <h2 className="mb-4 font-semibold">Import data</h2>

        <div className="mb-4 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={mergeMode === "merge"}
              onChange={() => setMergeMode("merge")}
            />
            Merge with existing
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={mergeMode === "replace"}
              onChange={() => setMergeMode("replace")}
            />
            Replace all data
          </label>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-10 hover:border-brand-300 hover:bg-brand-50/30">
          <Upload className="mb-2 h-8 w-8 text-muted" aria-hidden />
          <span className="text-sm font-medium">Upload JSON file</span>
          <span className="mt-1 text-xs text-muted">
            Colleges, branches, seats, fees, cutoffs, hostel
          </span>
          <input
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
        </label>

        {message && (
          <p
            className={`mt-4 rounded-lg p-3 text-sm ${
              message.type === "ok"
                ? "bg-emerald-50 text-emerald-900"
                : "bg-rose-50 text-rose-900"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Download className="h-4 w-4" aria-hidden />
            Export current JSON
          </button>
          <button
            type="button"
            onClick={loadSample}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Load sample schema
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Reset to seed data? This removes custom imports (replace mode)."
                )
              ) {
                resetToSeed();
                setMessage({ type: "ok", text: "Restored seed dataset." });
              }
            }}
            className="rounded-lg border border-rose-200 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50"
          >
            Reset to seed
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-2 font-semibold">JSON schema (required fields)</h2>
        <ul className="mb-4 list-inside list-disc text-sm text-slate-700">
          <li>Each college: id, name, city, district, state, type, website, officialSources[], branches[]</li>
          <li>Each branch: branchCode, branchName, seats, fee (annualTuition, totalFourYear), admissionMode</li>
          <li>Each numeric: {"{ value: number | null, source: { sourceName, sourceUrl, lastUpdated } }"}</li>
          <li>Use null value when fee/seat unknown — UI shows “Fee not available” / “Data not available”</li>
        </ul>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
          {SAMPLE_JSON}
        </pre>
      </section>
    </div>
  );
}

function validateColleges(data: College[]) {
  for (const c of data) {
    if (!c.id || !c.name) throw new Error("Each college needs id and name");
    if (c.state && c.state !== "Madhya Pradesh") {
      throw new Error(`Only MP colleges allowed: ${c.name}`);
    }
    for (const b of c.branches ?? []) {
      if (!b.seats?.source?.sourceName) {
        throw new Error(
          `Branch ${b.branchCode} in ${c.name}: seats must have source`
        );
      }
      if (!b.fee?.annualTuition?.source) {
        throw new Error(
          `Branch ${b.branchCode} in ${c.name}: annualTuition must have source`
        );
      }
    }
  }
}
