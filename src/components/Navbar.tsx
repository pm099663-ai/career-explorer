import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useCollegeData } from "../context/CollegeDataContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/colleges", label: "Colleges" },
  { to: "/branches", label: "Branches" },
  { to: "/compare", label: "Compare" },
  { to: "/admin", label: "Data" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { compareIds } = useCollegeData();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <GraduationCap className="h-7 w-7 text-brand-600" aria-hidden />
          <span className="hidden sm:inline">
            MP Engineering Seat & Fee Explorer
          </span>
          <span className="sm:hidden">MP Seat & Fee</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {item.label}
              {item.to === "/compare" && compareIds.length > 0 && (
                <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-xs text-white">
                  {compareIds.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
