import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Save, RotateCcw } from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { TagInput } from "../components/TagInput";
import { Disclaimer } from "../components/Disclaimer";
import {
  budgetOptions,
  educationLevels,
  examSuggestions,
  interestSuggestions,
  learningStyles,
  locationOptions,
  skillSuggestions,
  streams,
  subjectSuggestions,
} from "../data/formOptions";
import type { StudentProfile } from "../types/student";
import { defaultProfile } from "../types/student";

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProfilePage() {
  const { profile, setProfile, clearProfile } = useStudent();
  const [form, setForm] = useState<StudentProfile>(profile);
  const navigate = useNavigate();

  const update = (partial: Partial<StudentProfile>) => setForm((f) => ({ ...f, ...partial }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProfile(form);
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900">Student Profile</h1>
        <p className="mt-2 text-slate-500">
          Tell us about yourself — our AI career counselor will recommend your top 3 matches with
          full roadmaps.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 card-shadow space-y-4">
          <h2 className="font-semibold text-slate-800">Education</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Current class / level"
              value={form.educationLevel}
              options={educationLevels}
              onChange={(v) => update({ educationLevel: v })}
            />
            <SelectField
              label="Stream"
              value={form.stream}
              options={streams}
              onChange={(v) => update({ stream: v })}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 card-shadow space-y-4">
          <h2 className="font-semibold text-slate-800">Academics & interests</h2>
          <TagInput
            label="Favorite subjects"
            tags={form.favoriteSubjects}
            onChange={(favoriteSubjects) => update({ favoriteSubjects })}
            suggestions={subjectSuggestions}
          />
          <TagInput
            label="Interests"
            tags={form.interests}
            onChange={(interests) => update({ interests })}
            suggestions={interestSuggestions}
          />
          <TagInput
            label="Skills"
            tags={form.skills}
            onChange={(skills) => update({ skills })}
            suggestions={skillSuggestions}
          />
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 card-shadow space-y-4">
          <h2 className="font-semibold text-slate-800">Goals & preferences</h2>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Career goals</label>
            <textarea
              value={form.careerGoals}
              onChange={(e) => update({ careerGoals: e.target.value })}
              rows={3}
              required
              placeholder="e.g. I want to work in tech as a developer or explore design..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Preferred learning style"
              value={form.learningStyle}
              options={learningStyles}
              onChange={(v) => update({ learningStyle: v })}
            />
            <SelectField
              label="Budget preference"
              value={form.budget}
              options={budgetOptions}
              onChange={(v) => update({ budget: v })}
            />
            <SelectField
              label="Location preference"
              value={form.location}
              options={locationOptions}
              onChange={(v) => update({ location: v })}
            />
          </div>
          <TagInput
            label="Exam preferences (JEE, NEET, CUET, CA, UPSC, etc.)"
            tags={form.examPreferences}
            onChange={(examPreferences) => update({ examPreferences })}
            suggestions={examSuggestions}
          />
        </section>

        <Disclaimer compact />

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600"
          >
            <Save className="h-4 w-4" />
            Get AI recommendations
          </button>
          <button
            type="button"
            onClick={() => {
              clearProfile();
              setForm({ ...defaultProfile });
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
