import type { RawMission, SourceAdapter, SourceFetchResult } from "@/data-sources/types";
import missions from "@/data-sources/mock/secondaryMockPayload.json";

const SECONDARY_SOURCE_URL = "https://example.com/secondary-validation-source";
const ADAPTER_ID = "secondary-mock";
const ADAPTER_NAME = "Secondary Mock Validation Source";
const missionsPayload = missions as RawMission[];

export const secondaryMockSourceAdapter: SourceAdapter = {
  id: ADAPTER_ID,
  displayName: ADAPTER_NAME,
  enabled: false,
  async fetchUpcomingMissions(): Promise<SourceFetchResult> {
    return {
      sourceId: ADAPTER_ID,
      sourceName: ADAPTER_NAME,
      sourceUrl: SECONDARY_SOURCE_URL,
      fetchedAt: new Date().toISOString(),
      missions: missionsPayload
    };
  }
};
