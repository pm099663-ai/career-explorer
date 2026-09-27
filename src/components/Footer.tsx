import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden />
          <p>
            This explorer lists Madhya Pradesh engineering colleges only. Fees,
            seats, and cutoffs are shown only when backed by an official source
            (JoSAA, CSAB, MP DTE, AICTE, RGPV, or the college website). Always
            verify on the linked official portal before making admission
            decisions.
          </p>
        </div>
        <p className="text-center text-xs text-muted">
          MP Engineering College Seat & Fee Explorer · For counselling reference
          only · Not affiliated with MP DTE or JoSAA
        </p>
      </div>
    </footer>
  );
}
