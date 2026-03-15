import type { NormalizedMission } from "@/types/missions";

export const baseMission: NormalizedMission = {
  mission_id: "test:1",
  mission_name: "Test Mission",
  launcher_family: "Falcon 9",
  provider_broker: "Test Broker",
  launch_date_start: "2026-05-10",
  launch_date_end: "2026-05-10",
  launch_date_precision: "exact",
  launch_site: "Vandenberg",
  orbit_type: "SSO",
  altitude_km: 550,
  inclination_deg: 97.6,
  deployment_orbit_text: "SSO 550 km",
  payload_capacity_notes: "Payload note",
  source_url: "https://example.com/test",
  last_updated: "2026-03-10T00:00:00Z",
  raw_notes_text: null,
  raw_payload: { mission: "test" },
  data_completeness_score: 0,
  date_fit_score: 0,
  orbit_fit_score: 0,
  overall_score: 0,
  score_explanation: ""
};
