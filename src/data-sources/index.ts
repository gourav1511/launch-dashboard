import { liveSourceStubAdapter } from "@/data-sources/live/liveSource.stub";
import { primaryMockSourceAdapter } from "@/data-sources/mock/primaryMockSource";
import { secondaryMockSourceAdapter } from "@/data-sources/mock/secondaryMockSource";
import type { SourceAdapter } from "@/data-sources/types";

export const sourceAdapters: SourceAdapter[] = [
  primaryMockSourceAdapter,
  secondaryMockSourceAdapter,
  liveSourceStubAdapter
];

export const getEnabledSourceAdapters = (): SourceAdapter[] =>
  sourceAdapters.filter((adapter) => adapter.enabled);
