import type { NormalizedMission } from "@/types/missions";

export const calculateCompletenessScore = (mission: NormalizedMission): number => {
  const fields = [
    mission.mission_name,
    mission.launch_date_start || mission.launch_date_end,
    mission.launcher_family,
    mission.launch_site,
    mission.deployment_orbit_text || mission.orbit_type,
    mission.source_url
  ];

  const presentCount = fields.filter((field) => !!field).length;
  const score = (presentCount / fields.length) * 100;
  return Math.round(score);
};
