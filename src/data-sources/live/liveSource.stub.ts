import type { SourceAdapter, SourceFetchResult } from "@/data-sources/types";

export const liveSourceStubAdapter: SourceAdapter = {
  id: "live-source-stub",
  displayName: "Live Source Stub (Phase 5)",
  enabled: false,
  async fetchUpcomingMissions(): Promise<SourceFetchResult> {
    // TODO(phase-5): Replace this stub with an API-backed fetcher.
    // Suggested target: Launch Library 2 or another primary schedule API.
    // Keep this adapter contract unchanged so UI/scoring remain untouched.
    return {
      sourceId: "live-source-stub",
      sourceName: "Live Source Stub (Phase 5)",
      sourceUrl: "https://example.com/live-source-placeholder",
      fetchedAt: new Date().toISOString(),
      missions: []
    };
  }
};
