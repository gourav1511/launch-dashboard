import type { MissionFilters, MissionRequirements } from "@/types/missions";

export const defaultMissionRequirements: MissionRequirements = {
  earliestLaunchDate: "2026-05-01",
  latestLaunchDate: "2026-12-31",
  orbitType: "SSO",
  targetAltitudeKm: 550,
  targetInclinationDeg: 97.6,
  payloadMassKg: 150,
  missionNotes: "",
  preferredLaunchRegion: ""
};

export const defaultMissionFilters: MissionFilters = {
  launchDateFrom: "",
  launchDateTo: "",
  launcherFamilies: [],
  launchSites: [],
  orbitTypes: [],
  minScore: 0
};
