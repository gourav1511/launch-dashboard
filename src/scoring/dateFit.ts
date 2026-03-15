import type { MissionRequirements, NormalizedMission } from "@/types/missions";

const DAY_MS = 24 * 60 * 60 * 1000;

const parseDate = (value: string | null): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getGapDays = (
  missionStart: Date,
  missionEnd: Date,
  targetStart: Date,
  targetEnd: Date
): number => {
  if (missionEnd < targetStart) {
    return Math.ceil((targetStart.getTime() - missionEnd.getTime()) / DAY_MS);
  }
  if (missionStart > targetEnd) {
    return Math.ceil((missionStart.getTime() - targetEnd.getTime()) / DAY_MS);
  }
  return 0;
};

export const calculateDateFitScore = (
  mission: NormalizedMission,
  requirements: MissionRequirements
): number => {
  const missionStart = parseDate(mission.launch_date_start);
  const missionEnd = parseDate(mission.launch_date_end) ?? missionStart;
  const targetStart = parseDate(requirements.earliestLaunchDate);
  const targetEnd = parseDate(requirements.latestLaunchDate);

  let score = 20;

  if (missionStart && missionEnd && targetStart && targetEnd) {
    const overlaps = missionStart <= targetEnd && missionEnd >= targetStart;
    if (overlaps) {
      score = 100;
    } else {
      const gapDays = getGapDays(missionStart, missionEnd, targetStart, targetEnd);
      if (gapDays <= 14) score = 70;
      else if (gapDays <= 45) score = 40;
      else score = 10;
    }
  }

  if (["net", "tbd", "unknown"].includes(mission.launch_date_precision)) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};
