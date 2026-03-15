"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { getDatePrecisionLabel, formatLaunchWindow } from "@/lib/missionFormat";
import type { RankedMission } from "@/components/dashboard/types";

interface MissionsTableProps {
  missions: RankedMission[];
  onRowClick: (mission: RankedMission) => void;
}

const columnHelper = createColumnHelper<RankedMission>();

const precisionPillClassName: Record<RankedMission["launch_date_precision"], string> = {
  exact: "bg-emerald-100 text-emerald-800",
  window: "bg-blue-100 text-blue-800",
  net: "bg-amber-100 text-amber-800",
  tbd: "bg-orange-100 text-orange-800",
  unknown: "bg-slate-100 text-slate-700"
};

const columns = [
  columnHelper.accessor("rank", {
    header: "Rank",
    cell: (context) => (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
        {context.getValue()}
      </span>
    )
  }),
  columnHelper.accessor("mission_name", {
    header: "Mission Name"
  }),
  columnHelper.accessor("launcher_family", {
    header: "Launcher Family",
    cell: (context) => context.getValue() || "Unknown"
  }),
  columnHelper.display({
    id: "launchWindow",
    header: "Launch Date / Window",
    cell: (context) => {
      const mission = context.row.original;
      return (
        <div className="space-y-1">
          <div>{formatLaunchWindow(mission)}</div>
          <span
            className={`inline-flex rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${precisionPillClassName[mission.launch_date_precision]}`}
          >
            {getDatePrecisionLabel(mission.launch_date_precision)}
          </span>
        </div>
      );
    }
  }),
  columnHelper.accessor("launch_site", {
    header: "Launch Site",
    cell: (context) => context.getValue() || "Unknown"
  }),
  columnHelper.display({
    id: "deploymentOrbit",
    header: "Deployment Orbit",
    cell: (context) =>
      context.row.original.deployment_orbit_text ||
      context.row.original.orbit_type ||
      "Unknown"
  }),
  columnHelper.accessor("overall_score", {
    header: "Overall Score",
    cell: (context) => (
      <span className="inline-flex rounded-md bg-teal-100 px-2 py-1 text-sm font-semibold text-teal-900">
        {context.getValue()}
      </span>
    )
  })
];

export function MissionsTable({ missions, onRowClick }: MissionsTableProps) {
  const table = useReactTable({
    data: missions,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ranked Launch Opportunities</h2>
        <p className="text-sm text-slate-600">{missions.length} missions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-teal-50/50"
                onClick={() => onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-3 align-top text-slate-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
