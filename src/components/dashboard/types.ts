import type { NormalizedMission } from "@/types/missions";

export interface RankedMission extends NormalizedMission {
  rank: number;
}
