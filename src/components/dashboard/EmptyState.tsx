"use client";

import type { MissionFilters, MissionRequirements } from "@/types/missions";

interface EmptyStateProps {
  requirements: MissionRequirements;
  filters: MissionFilters;
  onResetFilters: () => void;
}

export function EmptyState({ requirements, filters, onResetFilters }: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-8 text-center shadow-panel">
      <h2 className="text-2xl font-semibold">No matching missions found</h2>
      <p className="mt-2 text-sm text-slate-600">
        Try broadening the constraints or clearing one or more filters.
      </p>
      <div className="mx-auto mt-4 max-w-2xl rounded-lg bg-slate-50 p-4 text-left text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Current constraints summary</p>
        <p>
          Requirement window: {requirements.earliestLaunchDate} to{" "}
          {requirements.latestLaunchDate}
        </p>
        <p>Target orbit: {requirements.orbitType || "Any"}</p>
        <p>Minimum score filter: {filters.minScore}</p>
      </div>
      <button
        className="mt-5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        onClick={onResetFilters}
        type="button"
      >
        Clear filters
      </button>
    </section>
  );
}
