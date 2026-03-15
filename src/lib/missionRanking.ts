import type { MissionFilters, NormalizedMission, SortKey } from "@/types/missions";

const parseTime = (value: string | null): number => {
  if (!value) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
};

const normalizeFilterValue = (value: string | null | undefined): string =>
  value?.trim() || "Unknown";

export const applyMissionFilters = (
  missions: NormalizedMission[],
  filters: MissionFilters
): NormalizedMission[] =>
  missions.filter((mission) => {
    if (mission.overall_score < filters.minScore) return false;

    if (filters.launcherFamilies.length > 0) {
      const family = normalizeFilterValue(mission.launcher_family);
      if (!filters.launcherFamilies.includes(family)) return false;
    }

    if (filters.launchSites.length > 0) {
      const site = normalizeFilterValue(mission.launch_site);
      if (!filters.launchSites.includes(site)) return false;
    }

    if (filters.orbitTypes.length > 0) {
      const orbitType = normalizeFilterValue(mission.orbit_type);
      if (!filters.orbitTypes.includes(orbitType)) return false;
    }

    const missionStart = parseTime(mission.launch_date_start);
    const missionEnd = parseTime(mission.launch_date_end || mission.launch_date_start);

    const hasDateFilter = Boolean(filters.launchDateFrom || filters.launchDateTo);
    const hasKnownDateWindow =
      Number.isFinite(missionStart) || Number.isFinite(missionEnd);
    if (hasDateFilter && !hasKnownDateWindow) return false;

    if (filters.launchDateFrom) {
      const dateFrom = parseTime(filters.launchDateFrom);
      if (missionEnd < dateFrom) return false;
    }

    if (filters.launchDateTo) {
      const dateTo = parseTime(filters.launchDateTo);
      if (missionStart > dateTo) return false;
    }

    return true;
  });

export const sortMissions = (
  missions: NormalizedMission[],
  sortKey: SortKey
): NormalizedMission[] => {
  const sorted = [...missions];

  sorted.sort((a, b) => {
    if (sortKey === "score_desc") {
      return b.overall_score - a.overall_score || a.mission_name.localeCompare(b.mission_name);
    }

    if (sortKey === "launch_date_asc") {
      const dateDifference = parseTime(a.launch_date_start) - parseTime(b.launch_date_start);
      if (dateDifference !== 0) return dateDifference;
      return b.overall_score - a.overall_score;
    }

    const familyA = normalizeFilterValue(a.launcher_family);
    const familyB = normalizeFilterValue(b.launcher_family);
    const familyDifference = familyA.localeCompare(familyB);
    if (familyDifference !== 0) return familyDifference;
    return b.overall_score - a.overall_score;
  });

  return sorted;
};
