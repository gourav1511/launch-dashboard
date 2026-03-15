import overrideRecords from "@/data/manual-overrides/missionOverrides.json";
import type { DatePrecision, NormalizedMission } from "@/types/missions";

type MissionOverride = {
  mission_id: string;
} & Partial<
  Pick<
    NormalizedMission,
    | "mission_name"
    | "launcher_family"
    | "provider_broker"
    | "launch_date_start"
    | "launch_date_end"
    | "launch_date_precision"
    | "launch_site"
    | "orbit_type"
    | "altitude_km"
    | "inclination_deg"
    | "deployment_orbit_text"
    | "payload_capacity_notes"
    | "source_url"
    | "last_updated"
    | "raw_notes_text"
  >
>;

const allowedPrecisions: DatePrecision[] = [
  "exact",
  "window",
  "net",
  "tbd",
  "unknown"
];

const normalizeOverride = (override: MissionOverride): MissionOverride => ({
  ...override,
  launch_date_precision:
    override.launch_date_precision &&
    allowedPrecisions.includes(override.launch_date_precision)
      ? override.launch_date_precision
      : undefined
});

const missionOverrideMap = new Map(
  (overrideRecords as MissionOverride[]).map((override) => {
    const normalized = normalizeOverride(override);
    return [normalized.mission_id, normalized];
  })
);

export const applyManualOverrides = (
  missions: NormalizedMission[]
): NormalizedMission[] =>
  missions.map((mission) => {
    const override = missionOverrideMap.get(mission.mission_id);
    if (!override) return mission;

    const { mission_id: _unusedMissionId, ...overrideFields } = override;
    return {
      ...mission,
      ...overrideFields
    };
  });
