import type { RoadmapStage } from "../types/student";
import {
  BookOpen,
  Briefcase,
  Flag,
  GraduationCap,
  Hammer,
  Target,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  flag: Flag,
  zap: Zap,
  book: BookOpen,
  target: Target,
  hammer: Hammer,
  graduation: GraduationCap,
  briefcase: Briefcase,
};

export function RoadmapTimeline({ stages }: { stages: RoadmapStage[] }) {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-5 top-3 bottom-3 w-0.5 roadmap-line rounded-full opacity-40" aria-hidden />
      {stages.map((stage, index) => {
        const Icon = iconMap[stage.icon] ?? Flag;
        return (
          <div
            key={stage.id}
            className="relative flex gap-4 pb-8 animate-fade-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-md">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 card-shadow">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-semibold text-slate-900">{stage.title}</h4>
                <span className="text-xs text-slate-400">Step {index + 1}</span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{stage.description}</p>
              <ul className="mt-3 space-y-1.5">
                {stage.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
