import { ExternalLink } from "lucide-react";
import type { DataSource } from "../types/college";
import { formatDate } from "../lib/format";

export function SourceBadge({ source }: { source: DataSource }) {
  return (
    <a
      href={source.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
      title={`Updated ${formatDate(source.lastUpdated)}`}
    >
      <span>{source.sourceName}</span>
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
    </a>
  );
}

export function SourceLine({ source }: { source?: DataSource }) {
  if (!source?.sourceName) {
    return (
      <p className="text-xs text-slate-500">Source: Data not available</p>
    );
  }
  return (
    <p className="text-xs text-slate-500">
      Source:{" "}
      <a
        href={source.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-600 underline-offset-2 hover:underline"
      >
        {source.sourceName}
      </a>
      {" · "}Updated {formatDate(source.lastUpdated)}
    </p>
  );
}
