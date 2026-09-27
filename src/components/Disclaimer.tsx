import { AlertCircle } from "lucide-react";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-amber-200/80 bg-amber-50/90 text-amber-950 ${
        compact ? "p-3 text-xs" : "p-4 text-sm"
      }`}
      role="note"
    >
      <AlertCircle className={`shrink-0 text-amber-600 ${compact ? "h-4 w-4" : "h-5 w-5"}`} />
      <p>
        <strong>Disclaimer:</strong> AI recommendations on FutureRoute AI are for guidance only.
        Please discuss important decisions with parents, teachers, school counselors, or certified
        career professionals before committing to exams, courses, or career paths.
      </p>
    </div>
  );
}
