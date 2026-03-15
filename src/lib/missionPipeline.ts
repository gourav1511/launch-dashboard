import { getEnabledSourceAdapters } from "@/data-sources";
import { normalizeAndMergeOverrides } from "@/normalizers";
import type { NormalizedMission } from "@/types/missions";

const asDateValue = (value: string | null): number => {
  if (!value) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
};

export const loadNormalizedMissions = async (): Promise<NormalizedMission[]> => {
  const adapters = getEnabledSourceAdapters();
  const normalizedCollections = await Promise.all(
    adapters.map(async (adapter) => {
      const result = await adapter.fetchUpcomingMissions();
      return normalizeAndMergeOverrides(result.missions, {
        sourceId: result.sourceId,
        sourceUrl: result.sourceUrl,
        fetchedAt: result.fetchedAt
      });
    })
  );

  return normalizedCollections
    .flat()
    .sort((a, b) => asDateValue(a.launch_date_start) - asDateValue(b.launch_date_start));
};
