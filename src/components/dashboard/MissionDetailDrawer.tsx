"use client";

import { formatLastUpdated, formatLaunchWindow, formatNumber, getDatePrecisionLabel } from "@/lib/missionFormat";
import type { RankedMission } from "@/components/dashboard/types";

interface MissionDetailDrawerProps {
  mission: RankedMission | null;
  onClose: () => void;
}

const DetailRow = ({
  label,
  value
}: {
  label: string;
  value: string;
}) => (
  <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-sm text-slate-900">{value}</p>
  </div>
);

export function MissionDetailDrawer({ mission, onClose }: MissionDetailDrawerProps) {
  return (
    <>
      {mission && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30"
          aria-hidden="true"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-200 ${mission ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!mission}
      >
        {mission && (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Rank #{mission.rank}
                </p>
                <h2 className="mt-1 text-xl font-semibold">{mission.mission_name}</h2>
              </div>
              <button
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto p-5">
              <DetailRow
                label="Launcher family"
                value={mission.launcher_family || "Unknown"}
              />
              <DetailRow
                label="Provider / broker"
                value={mission.provider_broker || "Unknown"}
              />
              <DetailRow
                label="Launch date or window"
                value={`${formatLaunchWindow(mission)} (${getDatePrecisionLabel(mission.launch_date_precision)})`}
              />
              <DetailRow label="Launch site" value={mission.launch_site || "Unknown"} />
              <DetailRow
                label="Deployment orbit"
                value={mission.deployment_orbit_text || mission.orbit_type || "Unknown"}
              />
              <DetailRow
                label="Orbit data type"
                value={
                  mission.altitude_km !== null || mission.inclination_deg !== null
                    ? "Structured orbit fields available"
                    : mission.deployment_orbit_text
                      ? "Free-text orbit notes only"
                      : "Orbit data missing"
                }
              />
              <DetailRow
                label="Payload capacity / rideshare notes"
                value={mission.payload_capacity_notes || "No notes available"}
              />

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Score breakdown
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <DetailRow
                    label="Overall score"
                    value={`${mission.overall_score} / 100`}
                  />
                  <DetailRow
                    label="Date fit"
                    value={`${mission.date_fit_score} / 100`}
                  />
                  <DetailRow
                    label="Orbit fit"
                    value={`${mission.orbit_fit_score} / 100`}
                  />
                  <DetailRow
                    label="Data completeness"
                    value={`${mission.data_completeness_score} / 100`}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-700">{mission.score_explanation}</p>
              </div>

              <DetailRow
                label="Altitude / inclination"
                value={`${formatNumber(mission.altitude_km, "km")} / ${formatNumber(mission.inclination_deg, "deg")}`}
              />
              <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Source URL
                </p>
                {mission.source_url ? (
                  <a
                    className="text-sm text-blue-700 underline"
                    href={mission.source_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {mission.source_url}
                  </a>
                ) : (
                  <p className="text-sm text-slate-900">Unknown</p>
                )}
              </div>
              <DetailRow
                label="Last updated"
                value={formatLastUpdated(mission.last_updated)}
              />
              <DetailRow
                label="Raw notes text"
                value={mission.raw_notes_text || "No notes"}
              />
              <details className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Raw source payload
                </summary>
                <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap rounded bg-slate-100 p-2 text-xs text-slate-700">
                  {JSON.stringify(mission.raw_payload, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
