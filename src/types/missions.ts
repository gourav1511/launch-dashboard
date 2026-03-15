export type DatePrecision = "exact" | "window" | "net" | "tbd" | "unknown";

export type OrbitType =
  | "SSO"
  | "LEO"
  | "MEO"
  | "GTO"
  | "GEO"
  | "HEO"
  | "Polar"
  | "Unknown";

export interface MissionRequirements {
  earliestLaunchDate: string;
  latestLaunchDate: string;
  orbitType: OrbitType | "";
  targetAltitudeKm: number | null;
  targetInclinationDeg: number | null;
  payloadMassKg: number | null;
  missionNotes: string;
  preferredLaunchRegion?: string;
}

export interface MissionScoreBreakdown {
  dateFit: number;
  orbitFit: number;
  dataCompleteness: number;
  overall: number;
  explanation: string;
}

export interface NormalizedMission {
  mission_id: string;
  mission_name: string;
  launcher_family: string | null;
  provider_broker: string | null;
  launch_date_start: string | null;
  launch_date_end: string | null;
  launch_date_precision: DatePrecision;
  launch_site: string | null;
  orbit_type: OrbitType | null;
  altitude_km: number | null;
  inclination_deg: number | null;
  deployment_orbit_text: string | null;
  payload_capacity_notes: string | null;
  source_url: string | null;
  last_updated: string | null;
  raw_notes_text: string | null;
  raw_payload: Record<string, unknown>;
  data_completeness_score: number;
  date_fit_score: number;
  orbit_fit_score: number;
  overall_score: number;
  score_explanation: string;
}

export interface MissionFilters {
  launchDateFrom: string;
  launchDateTo: string;
  launcherFamilies: string[];
  launchSites: string[];
  orbitTypes: string[];
  minScore: number;
}

export type SortKey =
  | "score_desc"
  | "launch_date_asc"
  | "launcher_family_asc";
