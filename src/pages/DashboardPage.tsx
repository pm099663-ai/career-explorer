import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  IndianRupee,
  Layers,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { RoadmapTimeline } from "../components/RoadmapTimeline";
import { Disclaimer } from "../components/Disclaimer";
import { careerFieldBySlug } from "../data/careerFields";

export function DashboardPage() {
  const { recommendations, hasProfile, profile } = useStudent();

  if (!hasProfile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <Layers className="mx-auto h-12 w-12 text-brand-300" />
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">Your roadmap dashboard</h1>
        <p className="mt-2 text-slate-500">
          Complete your student profile to unlock AI-powered top 3 career matches and visual
          roadmaps.
        </p>
        <Link
          to="/profile"
          className="mt-6 inline-block rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600"
        >
          Build profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Your career dashboard</h1>
          <p className="mt-1 text-slate-500">
            Top 3 matches for{" "}
            <span className="font-medium text-slate-700">
              {profile.stream.replace(/-/g, " ")} · {profile.educationLevel.replace(/-/g, " ")}
            </span>
          </p>
        </div>
        <Link to="/profile" className="text-sm font-medium text-brand-600 hover:underline">
          Edit profile →
        </Link>
      </div>

      <Disclaimer compact />

      <div className="mt-8 space-y-12">
        {recommendations.map((rec, index) => {
          const field = careerFieldBySlug[rec.field];
          return (
            <article
              key={rec.id}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden card-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-50 to-mint-400/10 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                      Match #{index + 1}
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">{rec.title}</h2>
                    {field && (
                      <span className={`mt-2 inline-block rounded-lg px-2.5 py-0.5 text-xs font-medium ${field.color}`}>
                        {field.name}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-brand-600">{rec.matchScore}%</div>
                    <div className="text-xs text-slate-500">match score</div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700">Why this path matches you</p>
                  <ul className="mt-2 space-y-1">
                    {rec.matchReasons.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-mint-500">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
                <Stat icon={Clock} label="Time" value={rec.estimatedTime} />
                <Stat icon={AlertTriangle} label="Difficulty" value={rec.difficulty} />
                <Stat icon={TrendingUp} label="Scope" value={rec.careerScope} />
                <Stat icon={IndianRupee} label="Salary" value={rec.salaryRange} />
              </div>

              <div className="grid gap-8 border-t border-slate-100 p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                    <BookOpen className="h-4 w-4 text-brand-500" />
                    Courses & skills
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase text-slate-400">Best courses</p>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {rec.courses.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-medium uppercase text-slate-400">Required skills</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {rec.requiredSkills.map((s) => (
                      <span key={s} className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase text-slate-400">Entrance exams</p>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {rec.entranceExams.map((e) => (
                      <li key={e}>• {e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Learning resources</h3>
                  <p className="mt-2 text-xs font-medium text-emerald-700">Free</p>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {rec.freeResources.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-medium text-brand-700">Paid (optional)</p>
                  <ul className="mt-1 space-y-1 text-sm text-slate-700">
                    {rec.paidResources.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                  {field && (
                    <Link
                      to={`/explore/${field.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                    >
                      Explore {field.name}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8">
                <h3 className="mb-6 font-display text-xl font-bold text-slate-900">
                  Personalized roadmap
                </h3>
                <RoadmapTimeline stages={rec.roadmap} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <Icon className="h-4 w-4 text-brand-500" />
      <p className="mt-2 text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
