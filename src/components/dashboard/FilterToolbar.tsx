"use client";

import type { MissionFilters, SortKey } from "@/types/missions";

interface FilterToolbarProps {
  filters: MissionFilters;
  onFiltersChange: (next: MissionFilters) => void;
  sortKey: SortKey;
  onSortChange: (next: SortKey) => void;
  launcherFamilies: string[];
  launchSites: string[];
  orbitTypes: string[];
  onClear: () => void;
}

const setSingleValue = (value: string): string[] => (value ? [value] : []);

export function FilterToolbar({
  filters,
  onFiltersChange,
  sortKey,
  onSortChange,
  launcherFamilies,
  launchSites,
  orbitTypes,
  onClear
}: FilterToolbarProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Filters and Sorting</h2>
        <button
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={onClear}
          type="button"
        >
          Clear filters
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="text-sm text-slate-700">
          Date from
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="date"
            value={filters.launchDateFrom}
            onChange={(event) =>
              onFiltersChange({ ...filters, launchDateFrom: event.target.value })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Date to
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="date"
            value={filters.launchDateTo}
            onChange={(event) =>
              onFiltersChange({ ...filters, launchDateTo: event.target.value })
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Launcher family
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={filters.launcherFamilies[0] ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                launcherFamilies: setSingleValue(event.target.value)
              })
            }
          >
            <option value="">All</option>
            {launcherFamilies.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Launch site
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={filters.launchSites[0] ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                launchSites: setSingleValue(event.target.value)
              })
            }
          >
            <option value="">All</option>
            {launchSites.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Orbit type
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={filters.orbitTypes[0] ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                orbitTypes: setSingleValue(event.target.value)
              })
            }
          >
            <option value="">All</option>
            {orbitTypes.map((orbitType) => (
              <option key={orbitType} value={orbitType}>
                {orbitType}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Sort by
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={sortKey}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
          >
            <option value="score_desc">Score (highest first)</option>
            <option value="launch_date_asc">Launch date (soonest first)</option>
            <option value="launcher_family_asc">Launcher family (A-Z)</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <label className="text-sm text-slate-700">
          Minimum score threshold:{" "}
          <span className="font-semibold text-slate-900">{filters.minScore}</span>
          <input
            className="mt-1 w-full accent-teal-700"
            type="range"
            min={0}
            max={100}
            step={5}
            value={filters.minScore}
            onChange={(event) =>
              onFiltersChange({ ...filters, minScore: Number(event.target.value) })
            }
          />
        </label>
      </div>
    </section>
  );
}
