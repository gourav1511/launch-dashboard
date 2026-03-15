import type { DatePrecision, OrbitType } from "@/types/missions";

export interface RawMission {
  sourceMissionId: string;
  missionName?: string;
  launcherFamily?: string;
  providerBroker?: string;
  launchDateStart?: string;
  launchDateEnd?: string;
  launchDatePrecision?: DatePrecision;
  launchSite?: string;
  orbitType?: OrbitType;
  altitudeKm?: number;
  inclinationDeg?: number;
  deploymentOrbitText?: string;
  payloadCapacityNotes?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  rawNotesText?: string;
}

export interface SourceFetchResult {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  fetchedAt: string;
  missions: RawMission[];
}

export interface SourceAdapter {
  id: string;
  displayName: string;
  enabled: boolean;
  fetchUpcomingMissions: () => Promise<SourceFetchResult>;
}
