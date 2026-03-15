import type {
  AccessMode,
  LaunchStatus,
  LaunchVehicleFilters,
  LaunchVehicleRecord
} from "@/types/launchVehicles";

const statusPriority: Record<LaunchStatus, number> = {
  Operational: 0,
  Upcoming: 1
};

export const defaultLaunchVehicleFilters: LaunchVehicleFilters = {
  searchText: "",
  launchStatus: "All",
  accessMode: "All"
};

export const filterLaunchVehicles = (
  records: LaunchVehicleRecord[],
  filters: LaunchVehicleFilters
): LaunchVehicleRecord[] => {
  const query = filters.searchText.trim().toLowerCase();

  return records.filter((record) => {
    if (filters.launchStatus !== "All" && record.launchStatus !== filters.launchStatus) {
      return false;
    }

    if (filters.accessMode !== "All" && record.accessMode !== filters.accessMode) {
      return false;
    }

    if (!query) return true;

    return (
      record.launcherName.toLowerCase().includes(query) ||
      record.launcherCompany.toLowerCase().includes(query)
    );
  });
};

export const sortLaunchVehicles = (
  records: LaunchVehicleRecord[]
): LaunchVehicleRecord[] =>
  [...records].sort((a, b) => {
    const statusDiff = statusPriority[a.launchStatus] - statusPriority[b.launchStatus];
    if (statusDiff !== 0) return statusDiff;
    return a.launcherName.localeCompare(b.launcherName);
  });

export const launchVehicleStatusOptions: Array<"All" | LaunchStatus> = [
  "All",
  "Operational",
  "Upcoming"
];

export const launchVehicleAccessModeOptions: Array<"All" | AccessMode> = [
  "All",
  "Dedicated",
  "Rideshare",
  "Both",
  "Unknown"
];
