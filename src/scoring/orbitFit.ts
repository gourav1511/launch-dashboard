import type { MissionRequirements, NormalizedMission } from "@/types/missions";

const scoreDelta = (
  delta: number,
  thresholds: [number, number, number]
): number => {
  const [tight, medium, loose] = thresholds;
  if (delta <= tight) return 30;
  if (delta <= medium) return 20;
  if (delta <= loose) return 10;
  return 0;
};

export const calculateOrbitFitScore = (
  mission: NormalizedMission,
  requirements: MissionRequirements
): number => {
  let score = 0;

  if (!mission.orbit_type || mission.orbit_type === "Unknown") {
    score += 15;
  } else if (requirements.orbitType && mission.orbit_type === requirements.orbitType) {
    score += 40;
  }

  const hasMissionAltitude = typeof mission.altitude_km === "number";
  const hasTargetAltitude = typeof requirements.targetAltitudeKm === "number";
  const hasMissionInclination = typeof mission.inclination_deg === "number";
  const hasTargetInclination = typeof requirements.targetInclinationDeg === "number";

  if (hasMissionAltitude && hasTargetAltitude) {
    const altitudeDelta = Math.abs(mission.altitude_km! - requirements.targetAltitudeKm!);
    score += scoreDelta(altitudeDelta, [30, 100, 300]);
  }

  if (hasMissionInclination && hasTargetInclination) {
    const inclinationDelta = Math.abs(
      mission.inclination_deg! - requirements.targetInclinationDeg!
    );
    score += scoreDelta(inclinationDelta, [2, 5, 10]);
  }

  if (
    !hasMissionAltitude &&
    !hasMissionInclination &&
    !!mission.deployment_orbit_text
  ) {
    score += 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};
