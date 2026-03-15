import type { LaunchVehicleRecord } from "@/types/launchVehicles";

export const launchVehicleFixture: LaunchVehicleRecord = {
  id: "launcher-1",
  launcherName: "Falcon 9",
  launcherCompany: "SpaceX",
  launchStatus: "Operational",
  accessMode: "Both",
  launchCapabilityShort: "LEO: 22.8 t",
  launchCapabilityFull: "Up to 22,800 kg to LEO",
  launchPlaceShort: "Cape Canaveral",
  launchPlaceFull: "Cape Canaveral Space Force Station, SLC-40",
  basicConfiguration: "Two-stage partially reusable rocket",
  notes: "Operational cadence with both dedicated and rideshare missions"
};
