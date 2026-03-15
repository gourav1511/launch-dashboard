import { describe, expect, it } from "vitest";
import {
  defaultLaunchVehicleFilters,
  filterLaunchVehicles,
  sortLaunchVehicles
} from "@/lib/launchVehicleOverview";
import { launchVehicleFixture } from "@/test/fixtures/launchVehicles";

describe("launch vehicle filtering", () => {
  const records = [
    launchVehicleFixture,
    {
      ...launchVehicleFixture,
      id: "launcher-2",
      launcherName: "Miura 5",
      launcherCompany: "PLD Space",
      launchStatus: "Upcoming" as const,
      accessMode: "Dedicated" as const
    },
    {
      ...launchVehicleFixture,
      id: "launcher-3",
      launcherName: "Rocket Alpha",
      launcherCompany: "Test Corp",
      launchStatus: "Operational" as const,
      accessMode: "Rideshare" as const
    }
  ];

  it("matches search by launcher name or company", () => {
    const filteredByName = filterLaunchVehicles(records, {
      ...defaultLaunchVehicleFilters,
      searchText: "miura"
    });
    expect(filteredByName).toHaveLength(1);

    const filteredByCompany = filterLaunchVehicles(records, {
      ...defaultLaunchVehicleFilters,
      searchText: "spacex"
    });
    expect(filteredByCompany).toHaveLength(1);
  });

  it("filters by status and access mode", () => {
    const filtered = filterLaunchVehicles(records, {
      ...defaultLaunchVehicleFilters,
      launchStatus: "Operational",
      accessMode: "Rideshare"
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("launcher-3");
  });
});

describe("launch vehicle sorting", () => {
  it("sorts by status then launcher name", () => {
    const sorted = sortLaunchVehicles([
      {
        ...launchVehicleFixture,
        id: "c",
        launcherName: "Zenith",
        launchStatus: "Upcoming"
      },
      {
        ...launchVehicleFixture,
        id: "b",
        launcherName: "Beta",
        launchStatus: "Operational"
      },
      {
        ...launchVehicleFixture,
        id: "a",
        launcherName: "Alpha",
        launchStatus: "Operational"
      }
    ]);

    expect(sorted.map((record) => record.id)).toEqual(["a", "b", "c"]);
  });
});
