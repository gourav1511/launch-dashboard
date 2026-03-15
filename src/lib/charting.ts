import type { NormalizedMission } from "@/types/missions";

const parseDate = (value: string | null): Date | null => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const getLaunchesByMonthData = (missions: NormalizedMission[]) => {
  const bucket = new Map<string, number>();

  missions.forEach((mission) => {
    const parsed = parseDate(mission.launch_date_start);
    const monthKey = parsed
      ? parsed.toLocaleDateString("en-US", { year: "numeric", month: "short" })
      : "Unknown";
    bucket.set(monthKey, (bucket.get(monthKey) || 0) + 1);
  });

  return Array.from(bucket.entries()).map(([month, launches]) => ({ month, launches }));
};

export const getLauncherBreakdownData = (missions: NormalizedMission[]) => {
  const bucket = new Map<string, number>();

  missions.forEach((mission) => {
    const family = mission.launcher_family || "Unknown";
    bucket.set(family, (bucket.get(family) || 0) + 1);
  });

  return Array.from(bucket.entries())
    .map(([launcher, count]) => ({ launcher, count }))
    .sort((a, b) => b.count - a.count);
};

export const getScoreDistributionData = (missions: NormalizedMission[]) => {
  const ranges = [
    { label: "0-19", min: 0, max: 19 },
    { label: "20-39", min: 20, max: 39 },
    { label: "40-59", min: 40, max: 59 },
    { label: "60-79", min: 60, max: 79 },
    { label: "80-100", min: 80, max: 100 }
  ];

  return ranges.map((range) => ({
    range: range.label,
    missions: missions.filter(
      (mission) =>
        mission.overall_score >= range.min && mission.overall_score <= range.max
    ).length
  }));
};
