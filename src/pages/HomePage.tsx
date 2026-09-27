import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useCollegeData } from "../context/CollegeDataContext";
import { SummaryCards } from "../components/SummaryCards";
import { TypeBadge } from "../components/TypeBadge";
import { computeStats } from "../lib/stats";
import type { CollegeType } from "../types/college";

const QUICK_TYPES: CollegeType[] = [
  "IIT",
  "NIT",
  "IIIT",
  "Government",
  "Private",
];

export function HomePage() {
  const { colleges } = useCollegeData();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const stats = useMemo(() => computeStats(colleges), [colleges]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/colleges?q=${encodeURIComponent(q)}` : "/colleges");
  };

  return (
    <div className="gradient-hero">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-brand-600">
            Madhya Pradesh · B.Tech Counselling
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            MP Engineering College Seat & Fee Explorer
          </h1>
          <p className="mt-4 text-muted">
            Search and compare IIT, NIT, IIIT, government, private, and
            AICTE-approved engineering colleges in Madhya Pradesh — by branch,
            seats, fees, cutoffs, and admission process.
          </p>

          <form onSubmit={handleSearch} className="mt-8">
            <div className="card-shadow mx-auto flex max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-card">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="College name, city, or branch (e.g. CSE, Indore)"
                className="flex-1 border-0 px-4 py-3 text-sm outline-none"
                aria-label="Search colleges"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700"
              >
                <Search className="h-4 w-4" aria-hidden />
                Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-muted">Quick filters:</span>
            {QUICK_TYPES.map((t) => (
              <Link
                key={t}
                to={`/colleges?type=${encodeURIComponent(t)}`}
                className="inline-flex"
              >
                <TypeBadge type={t} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <SummaryCards stats={stats} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-6 text-center font-display text-xl font-semibold">
          Explore by goal
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "All colleges",
              desc: "Filter by city, fee, seats, and admission mode",
              to: "/colleges",
            },
            {
              title: "By branch",
              desc: "CSE, ECE, AI/ML, Mechanical, and more",
              to: "/branches",
            },
            {
              title: "Compare",
              desc: "Side-by-side comparison of up to 4 colleges",
              to: "/compare",
            },
            {
              title: "Update data",
              desc: "Upload official CSV/JSON with source links",
              to: "/admin",
            },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="card-shadow rounded-xl border border-slate-200/80 bg-card p-5 transition hover:border-brand-200"
            >
              <h3 className="font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-muted">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-card p-6">
          <h3 className="font-semibold">Official data sources</h3>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {[
              ["JoSAA", "https://josaa.nic.in/"],
              ["CSAB", "https://csab.nic.in/"],
              ["MP DTE", "https://dte.mponline.gov.in/"],
              ["AICTE", "https://www.aicte-india.org/"],
              ["RGPV", "https://www.rgpv.ac.in/"],
            ].map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            {colleges.length} colleges in seed data. Upload verified seat and fee
            matrices on the Data page — we never display estimated fees.
          </p>
        </div>
      </section>
    </div>
  );
}
