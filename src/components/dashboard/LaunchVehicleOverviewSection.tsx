"use client";

import { Fragment, useMemo, useState } from "react";
import {
  defaultLaunchVehicleFilters,
  filterLaunchVehicles,
  launchVehicleAccessModeOptions,
  launchVehicleStatusOptions,
  sortLaunchVehicles
} from "@/lib/launchVehicleOverview";
import type { LaunchVehicleFilters, LaunchVehicleRecord } from "@/types/launchVehicles";

interface LaunchVehicleOverviewSectionProps {
  records: LaunchVehicleRecord[];
}

const statusBadgeClassName: Record<LaunchVehicleRecord["launchStatus"], string> = {
  Operational: "bg-emerald-100 text-emerald-800",
  Upcoming: "bg-blue-100 text-blue-800"
};

const accessBadgeClassName: Record<LaunchVehicleRecord["accessMode"], string> = {
  Dedicated: "bg-slate-100 text-slate-800",
  Rideshare: "bg-amber-100 text-amber-800",
  Both: "bg-teal-100 text-teal-800",
  Unknown: "bg-zinc-100 text-zinc-700"
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm text-slate-800">{value}</p>
  </div>
);

export function LaunchVehicleOverviewSection({
  records
}: LaunchVehicleOverviewSectionProps) {
  const [filters, setFilters] = useState<LaunchVehicleFilters>(
    defaultLaunchVehicleFilters
  );
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const visibleRecords = useMemo(() => {
    const filtered = filterLaunchVehicles(records, filters);
    return sortLaunchVehicles(filtered);
  }, [records, filters]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-panel">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Launch Vehicle Overview</h2>
        <p className="mt-1 text-sm text-slate-600">
          Reference view of launcher availability and access mode. Expand any row for
          deeper configuration and location details.
        </p>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <label className="text-sm text-slate-700">
          Search launcher / company
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            type="search"
            placeholder="Type launcher name or company..."
            value={filters.searchText}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, searchText: event.target.value }))
            }
          />
        </label>

        <label className="text-sm text-slate-700">
          Launch status
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={filters.launchStatus}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                launchStatus: event.target.value as LaunchVehicleFilters["launchStatus"]
              }))
            }
          >
            {launchVehicleStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-700">
          Rideshare / Dedicated / Both
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={filters.accessMode}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                accessMode: event.target.value as LaunchVehicleFilters["accessMode"]
              }))
            }
          >
            {launchVehicleAccessModeOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-10 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Toggle
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Launcher name
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Launcher company
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Launch status
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Launch capability
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Rideshare / Dedicated / Both
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Launch Site
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {visibleRecords.map((record) => {
              const isExpanded = expandedRowId === record.id;
              return (
                <Fragment key={record.id}>
                  <tr
                    className={`cursor-pointer transition-colors ${
                      isExpanded ? "bg-teal-50/45" : "hover:bg-slate-50"
                    }`}
                    onClick={() => setExpandedRowId(isExpanded ? null : record.id)}
                  >
                    <td className="px-3 py-3 align-top text-slate-500">
                      <button
                        type="button"
                        aria-label={`Expand ${record.launcherName}`}
                        className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-xs"
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpandedRowId(isExpanded ? null : record.id);
                        }}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-900">{record.launcherName}</td>
                    <td className="px-3 py-3 text-slate-700">{record.launcherCompany}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${statusBadgeClassName[record.launchStatus]}`}
                      >
                        {record.launchStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-700">{record.launchCapabilityShort}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold ${accessBadgeClassName[record.accessMode]}`}
                      >
                        {record.accessMode}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-700">{record.launchPlaceShort}</td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50/75">
                      <td colSpan={7} className="px-3 pb-4 pt-1">
                        <div className="grid gap-3 md:grid-cols-2">
                          <DetailItem
                            label="Basic configuration"
                            value={record.basicConfiguration}
                          />
                          <DetailItem
                            label="Capability details"
                            value={record.launchCapabilityFull}
                          />
                          <DetailItem
                            label="Launch location details"
                            value={record.launchPlaceFull}
                          />
                          <DetailItem label="Notes" value={record.notes} />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {visibleRecords.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          No launch vehicles match the current filters.
        </div>
      )}
    </section>
  );
}

