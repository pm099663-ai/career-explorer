import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { careerFieldBySlug } from "../data/careerFields";

export function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const field = slug ? careerFieldBySlug[slug] : undefined;

  if (!field) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-slate-500">Career field not found.</p>
        <Link to="/explore" className="mt-4 inline-block text-brand-600 hover:underline">
          ← Back to explorer
        </Link>
      </div>
    );
  }

  const Icon = field.icon;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/explore"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        All careers
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${field.color}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">{field.name}</h1>
          <p className="mt-1 text-lg text-slate-500">{field.tagline}</p>
        </div>
      </div>

      <p className="mt-6 text-slate-700 leading-relaxed">{field.overview}</p>

      <Section title="Popular roles" items={field.popularRoles} />
      <Section title="Top entrance exams" items={field.topExams} />
      <Section title="Skills you'll need" items={field.skillsNeeded} />
      <Section title="Degrees & courses" items={field.degrees} />

      <div className="mt-8 rounded-2xl bg-brand-50 p-5">
        <p className="text-sm font-medium text-brand-800">Salary note (India)</p>
        <p className="mt-1 text-slate-700">{field.salaryNote}</p>
      </div>

      <h2 className="mt-8 font-semibold text-slate-900">Roadmap tips</h2>
      <ul className="mt-3 space-y-2">
        {field.roadmapTips.map((tip) => (
          <li key={tip} className="flex gap-2 text-sm text-slate-700">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-mint-500" />
            {tip}
          </li>
        ))}
      </ul>

      <Link
        to="/profile"
        className="mt-10 inline-block rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600"
      >
        Get personalized matches →
      </Link>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
