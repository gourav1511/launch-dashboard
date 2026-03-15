export type LaunchStatus = "Operational" | "Upcoming";

export type AccessMode = "Dedicated" | "Rideshare" | "Both" | "Unknown";

export interface LaunchVehicleRecord {
  id: string;
  launcherName: string;
  launcherCompany: string;
  launchStatus: LaunchStatus;
  accessMode: AccessMode;
  launchCapabilityShort: string;
  launchCapabilityFull: string;
  launchPlaceShort: string;
  launchPlaceFull: string;
  basicConfiguration: string;
  notes: string;
}

export interface LaunchVehicleFilters {
  searchText: string;
  launchStatus: "All" | LaunchStatus;
  accessMode: "All" | AccessMode;
}
