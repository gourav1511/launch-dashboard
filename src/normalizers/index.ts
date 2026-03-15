import type { RawMission } from "@/data-sources/types";
import { normalizeRawMission, type NormalizationContext } from "@/normalizers/normalizeMission";
import { applyManualOverrides } from "@/normalizers/manualOverrides";
import type { NormalizedMission } from "@/types/missions";

export const normalizeMissions = (
  rawMissions: RawMission[],
  context: NormalizationContext
): NormalizedMission[] => rawMissions.map((mission) => normalizeRawMission(mission, context));

export const normalizeAndMergeOverrides = (
  rawMissions: RawMission[],
  context: NormalizationContext
): NormalizedMission[] => applyManualOverrides(normalizeMissions(rawMissions, context));
