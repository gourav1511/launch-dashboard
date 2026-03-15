"use client";

import type { MissionRequirements } from "@/types/missions";

interface RequirementsPanelProps {
  requirements: MissionRequirements;
  onChange: (next: MissionRequirements) => void;
}

const orbitOptions = ["", "SSO", "LEO", "MEO", "GTO", "GEO", "HEO", "Polar"];

const numberFromInput = (value: string): number | null => {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export function RequirementsPanel({ requirements, onChange }: RequirementsPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-panel">
      <h2 className="mb-4 text-xl font-semibold">Mission Requirements</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm text-slate-700">
          Earliest launch date
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="date"
            value={requirements.earliestLaunchDate}
            onChange={(event) =>
              onChange({ ...requirements, earliestLaunchDate: event.target.value })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Latest launch date
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="date"
            value={requirements.latestLaunchDate}
            onChange={(event) =>
              onChange({ ...requirements, latestLaunchDate: event.target.value })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Orbit type
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={requirements.orbitType}
            onChange={(event) =>
              onChange({ ...requirements, orbitType: event.target.value as MissionRequirements["orbitType"] })
            }
          >
            {orbitOptions.map((option) => (
              <option key={option} value={option}>
                {option || "Any"}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Payload mass (kg)
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="number"
            value={requirements.payloadMassKg ?? ""}
            onChange={(event) =>
              onChange({ ...requirements, payloadMassKg: numberFromInput(event.target.value) })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Target altitude (km)
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="number"
            value={requirements.targetAltitudeKm ?? ""}
            onChange={(event) =>
              onChange({
                ...requirements,
                targetAltitudeKm: numberFromInput(event.target.value)
              })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Target inclination (deg)
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="number"
            value={requirements.targetInclinationDeg ?? ""}
            onChange={(event) =>
              onChange({
                ...requirements,
                targetInclinationDeg: numberFromInput(event.target.value)
              })
            }
          />
        </label>

        <label className="text-sm text-slate-700 sm:col-span-2 lg:col-span-2">
          Optional mission notes
          <textarea
            className="mt-1 h-[42px] w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Any additional constraints..."
            value={requirements.missionNotes}
            onChange={(event) =>
              onChange({ ...requirements, missionNotes: event.target.value })
            }
          />
        </label>
      </div>
    </section>
  );
}
