import { describe, expect, it } from "vitest";
import { applyManualOverrides } from "@/normalizers/manualOverrides";
import { normalizeRawMission } from "@/normalizers/normalizeMission";
import type { RawMission } from "@/data-sources/types";

describe("normalization", () => {
  it("maps raw mission fields into normalized schema", () => {
    const rawMission: RawMission = {
      sourceMissionId: "abc-123",
      missionName: "  Demo Mission  ",
      launchDateStart: "2026-06-01",
      launchDatePrecision: "exact",
      orbitType: "SSO",
      deploymentOrbitText: "SSO 550 km"
    };

    const normalized = normalizeRawMission(rawMission, {
      sourceId: "primary-mock",
      sourceUrl: "https://example.com/source",
      fetchedAt: "2026-03-10T00:00:00Z"
    });

    expect(normalized.mission_id).toBe("primary-mock:abc-123");
    expect(normalized.mission_name).toBe("Demo Mission");
    expect(normalized.source_url).toBe("https://example.com/source");
    expect(normalized.launch_date_precision).toBe("exact");
    expect(normalized.raw_payload).toEqual(rawMission);
  });

  it("falls back to unknown precision when invalid", () => {
    const rawMission: RawMission = {
      sourceMissionId: "abc-124",
      missionName: "Invalid Precision Mission",
      launchDatePrecision: "exactly" as never
    };

    const normalized = normalizeRawMission(rawMission, {
      sourceId: "primary-mock",
      sourceUrl: "https://example.com/source",
      fetchedAt: "2026-03-10T00:00:00Z"
    });

    expect(normalized.launch_date_precision).toBe("unknown");
  });
});

describe("manual overrides", () => {
  it("applies manual override values on top of normalized records", () => {
    const missions = [
      {
        mission_id: "primary-mock:ll2-1003",
        mission_name: "Pathfinder Earth Watch",
        launcher_family: "Vega C",
        provider_broker: "Arianespace",
        launch_date_start: "2026-06-19",
        launch_date_end: "2026-06-19",
        launch_date_precision: "net",
        launch_site: "CSG ELV",
        orbit_type: "LEO",
        altitude_km: 620,
        inclination_deg: 98.4,
        deployment_orbit_text: "High-inclination LEO",
        payload_capacity_notes: null,
        source_url: "https://example.com/source",
        last_updated: "2026-03-10T00:00:00Z",
        raw_notes_text: null,
        raw_payload: {},
        data_completeness_score: 0,
        date_fit_score: 0,
        orbit_fit_score: 0,
        overall_score: 0,
        score_explanation: ""
      }
    ];

    const overridden = applyManualOverrides(missions);

    expect(overridden[0].provider_broker).toBe("Arianespace Rideshare Desk");
    expect(overridden[0].payload_capacity_notes).toContain("microsat slot");
  });
});
