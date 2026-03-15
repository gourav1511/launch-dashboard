import { scoreMission } from "@/scoring/scoreMission";
import type { ScoringWeights } from "@/scoring/weights";
import type { MissionRequirements, NormalizedMission } from "@/types/missions";

export const scoreMissions = (
  missions: NormalizedMission[],
  requirements: MissionRequirements,
  weights?: ScoringWeights
): NormalizedMission[] => missions.map((mission) => scoreMission(mission, requirements, weights));

export { defaultScoringWeights } from "@/scoring/weights";
