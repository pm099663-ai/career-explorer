import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { careerFields } from "../data/careerFields";

export function ExplorePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900">Career Explorer</h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Browse 11 career fields — roles, exams, skills, degrees, and roadmap tips for each path.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careerFields.map((field) => {
          const Icon = field.icon;
          return (
            <Link
              key={field.slug}
              to={`/explore/${field.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 card-shadow transition hover:border-brand-200"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${field.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900 group-hover:text-brand-700">
                {field.name}
              </h2>
              <p className="mt-1 flex-1 text-sm text-slate-500">{field.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
