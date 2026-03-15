import type { RawMission, SourceAdapter, SourceFetchResult } from "@/data-sources/types";
import missions from "@/data-sources/mock/primaryMockPayload.json";

const PRIMARY_SOURCE_URL = "https://example.com/primary-launch-api";
const ADAPTER_ID = "primary-mock";
const ADAPTER_NAME = "Primary Mock Launch API";
const missionsPayload = missions as RawMission[];

export const primaryMockSourceAdapter: SourceAdapter = {
  id: ADAPTER_ID,
  displayName: ADAPTER_NAME,
  enabled: true,
  async fetchUpcomingMissions(): Promise<SourceFetchResult> {
    return {
      sourceId: ADAPTER_ID,
      sourceName: ADAPTER_NAME,
      sourceUrl: PRIMARY_SOURCE_URL,
      fetchedAt: new Date().toISOString(),
      missions: missionsPayload
    };
  }
};
