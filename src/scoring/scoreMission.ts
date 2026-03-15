import { calculateCompletenessScore } from "@/scoring/completeness";
import { calculateDateFitScore } from "@/scoring/dateFit";
import { calculateOrbitFitScore } from "@/scoring/orbitFit";
import { defaultScoringWeights, type ScoringWeights } from "@/scoring/weights";
import type { MissionRequirements, MissionScoreBreakdown, NormalizedMission } from "@/types/missions";

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

export const buildScoreExplanation = (
  mission: NormalizedMission,
  breakdown: MissionScoreBreakdown
): string => {
  const dateSignal =
    breakdown.dateFit >= 80
      ? "Strong date alignment"
      : breakdown.dateFit >= 50
        ? "Partial date alignment"
        : "Date window is weak";

  const orbitSignal =
    breakdown.orbitFit >= 70
      ? "orbit match is strong"
      : breakdown.orbitFit >= 40
        ? "orbit match is moderate"
        : "orbit compatibility is limited";

  const precisionSignal =
    mission.launch_date_precision === "exact"
      ? "exact schedule data"
      : `date precision: ${mission.launch_date_precision}`;

  return `${dateSignal}; ${orbitSignal}; completeness ${breakdown.dataCompleteness}/100; ${precisionSignal}.`;
};

export const scoreMission = (
  mission: NormalizedMission,
  requirements: MissionRequirements,
  weights: ScoringWeights = defaultScoringWeights
): NormalizedMission => {
  const dateFit = calculateDateFitScore(mission, requirements);
  const orbitFit = calculateOrbitFitScore(mission, requirements);
  const dataCompleteness = calculateCompletenessScore(mission);

  const weightedScore =
    dateFit * weights.dateFit +
    orbitFit * weights.orbitFit +
    dataCompleteness * weights.dataCompleteness;

  const overall = clamp(Math.round(weightedScore));
  const breakdown: MissionScoreBreakdown = {
    dateFit,
    orbitFit,
    dataCompleteness,
    overall,
    explanation: ""
  };

  breakdown.explanation = buildScoreExplanation(mission, breakdown);

  return {
    ...mission,
    date_fit_score: dateFit,
    orbit_fit_score: orbitFit,
    data_completeness_score: dataCompleteness,
    overall_score: overall,
    score_explanation: breakdown.explanation
  };
};
