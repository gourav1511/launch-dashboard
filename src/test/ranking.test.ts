import { describe, expect, it } from "vitest";
import { applyMissionFilters, sortMissions } from "@/lib/missionRanking";
import { baseMission } from "@/test/fixtures/missions";
import type { MissionFilters } from "@/types/missions";

const defaultFilters: MissionFilters = {
  launchDateFrom: "",
  launchDateTo: "",
  launcherFamilies: [],
  launchSites: [],
  orbitTypes: [],
  minScore: 0
};

describe("mission filters", () => {
  it("filters by minimum score and orbit type", () => {
    const missions = [
      { ...baseMission, mission_id: "m1", overall_score: 85, orbit_type: "SSO" as const },
      { ...baseMission, mission_id: "m2", overall_score: 45, orbit_type: "LEO" as const }
    ];

    const filtered = applyMissionFilters(missions, {
      ...defaultFilters,
      minScore: 70,
      orbitTypes: ["SSO"]
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].mission_id).toBe("m1");
  });
});

describe("mission sorting", () => {
  it("sorts by score descending", () => {
    const missions = [
      { ...baseMission, mission_id: "m1", mission_name: "A", overall_score: 60 },
      { ...baseMission, mission_id: "m2", mission_name: "B", overall_score: 90 }
    ];

    const sorted = sortMissions(missions, "score_desc");
    expect(sorted[0].mission_id).toBe("m2");
  });

  it("keeps stable tie-break by mission name when scores match", () => {
    const missions = [
      { ...baseMission, mission_id: "m1", mission_name: "Bravo", overall_score: 70 },
      { ...baseMission, mission_id: "m2", mission_name: "Alpha", overall_score: 70 }
    ];

    const sorted = sortMissions(missions, "score_desc");
    expect(sorted.map((mission) => mission.mission_name)).toEqual(["Alpha", "Bravo"]);
  });
});
