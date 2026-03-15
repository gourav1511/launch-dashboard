import { describe, expect, it } from "vitest";
import { calculateCompletenessScore } from "@/scoring/completeness";
import { calculateDateFitScore } from "@/scoring/dateFit";
import { calculateOrbitFitScore } from "@/scoring/orbitFit";
import { scoreMission } from "@/scoring/scoreMission";
import { defaultMissionRequirements } from "@/lib/defaultState";
import { baseMission } from "@/test/fixtures/missions";

describe("date fit scoring", () => {
  it("returns 100 for overlapping windows", () => {
    const score = calculateDateFitScore(baseMission, defaultMissionRequirements);
    expect(score).toBe(100);
  });

  it("returns medium score for near but non-overlapping windows", () => {
    const mission = { ...baseMission, launch_date_start: "2027-01-08", launch_date_end: "2027-01-08" };
    const score = calculateDateFitScore(mission, defaultMissionRequirements);
    expect(score).toBe(70);
  });

  it("penalizes unknown date precision", () => {
    const mission = {
      ...baseMission,
      launch_date_start: null,
      launch_date_end: null,
      launch_date_precision: "unknown" as const
    };
    const score = calculateDateFitScore(mission, defaultMissionRequirements);
    expect(score).toBe(10);
  });
});

describe("orbit fit scoring", () => {
  it("returns high score for type/altitude/inclination match", () => {
    const score = calculateOrbitFitScore(baseMission, defaultMissionRequirements);
    expect(score).toBe(100);
  });

  it("returns low score for orbit mismatch", () => {
    const mission = {
      ...baseMission,
      orbit_type: "GTO" as const,
      altitude_km: 30000,
      inclination_deg: 20
    };
    const score = calculateOrbitFitScore(mission, defaultMissionRequirements);
    expect(score).toBe(0);
  });
});

describe("completeness and overall scoring", () => {
  it("calculates completeness from required fields", () => {
    const mission = {
      ...baseMission,
      launch_site: null,
      deployment_orbit_text: null
    };
    const score = calculateCompletenessScore(mission);
    expect(score).toBeLessThan(100);
    expect(score).toBeGreaterThan(60);
  });

  it("stamps all score fields and explanation", () => {
    const scored = scoreMission(baseMission, defaultMissionRequirements);
    expect(scored.overall_score).toBeGreaterThan(0);
    expect(scored.date_fit_score).toBeGreaterThan(0);
    expect(scored.orbit_fit_score).toBeGreaterThan(0);
    expect(scored.data_completeness_score).toBeGreaterThan(0);
    expect(scored.score_explanation.length).toBeGreaterThan(10);
  });
});
