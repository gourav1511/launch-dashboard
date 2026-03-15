import type { RawMission } from "@/data-sources/types";
import type { DatePrecision, NormalizedMission, OrbitType } from "@/types/missions";

export interface NormalizationContext {
  sourceId: string;
  sourceUrl: string;
  fetchedAt: string;
}

const orbitTypes: OrbitType[] = [
  "SSO",
  "LEO",
  "MEO",
  "GTO",
  "GEO",
  "HEO",
  "Polar",
  "Unknown"
];

const normalizeOrbitType = (value: string | undefined): OrbitType | null => {
  if (!value) return null;
  const normalized = value.trim() as OrbitType;
  return orbitTypes.includes(normalized) ? normalized : "Unknown";
};

const normalizeDatePrecision = (
  value: DatePrecision | undefined
): DatePrecision => {
  if (!value) return "unknown";
  if (["exact", "window", "net", "tbd", "unknown"].includes(value)) {
    return value;
  }
  return "unknown";
};

const ensureMissionId = (
  rawMission: RawMission,
  context: NormalizationContext
): string => {
  if (rawMission.sourceMissionId && rawMission.sourceMissionId.trim()) {
    return `${context.sourceId}:${rawMission.sourceMissionId.trim()}`;
  }
  const missionName = rawMission.missionName ?? "unnamed-mission";
  const launchDate = rawMission.launchDateStart ?? "unknown-date";
  return `${context.sourceId}:${missionName}-${launchDate}`
    .toLowerCase()
    .replace(/[^a-z0-9:-]+/g, "-");
};

const toNullableNumber = (value: number | undefined): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const toNullableText = (value: string | undefined): string | null =>
  value && value.trim() ? value.trim() : null;

export const normalizeRawMission = (
  rawMission: RawMission,
  context: NormalizationContext
): NormalizedMission => {
  const missionId = ensureMissionId(rawMission, context);

  return {
    mission_id: missionId,
    mission_name: rawMission.missionName?.trim() || "Unnamed mission",
    launcher_family: toNullableText(rawMission.launcherFamily),
    provider_broker: toNullableText(rawMission.providerBroker),
    launch_date_start: toNullableText(rawMission.launchDateStart),
    launch_date_end: toNullableText(rawMission.launchDateEnd),
    launch_date_precision: normalizeDatePrecision(rawMission.launchDatePrecision),
    launch_site: toNullableText(rawMission.launchSite),
    orbit_type: normalizeOrbitType(rawMission.orbitType),
    altitude_km: toNullableNumber(rawMission.altitudeKm),
    inclination_deg: toNullableNumber(rawMission.inclinationDeg),
    deployment_orbit_text: toNullableText(rawMission.deploymentOrbitText),
    payload_capacity_notes: toNullableText(rawMission.payloadCapacityNotes),
    source_url: toNullableText(rawMission.sourceUrl) || context.sourceUrl,
    last_updated: toNullableText(rawMission.lastUpdated) || context.fetchedAt,
    raw_notes_text: toNullableText(rawMission.rawNotesText),
    raw_payload: { ...rawMission },
    data_completeness_score: 0,
    date_fit_score: 0,
    orbit_fit_score: 0,
    overall_score: 0,
    score_explanation: "Score not yet calculated"
  };
};
