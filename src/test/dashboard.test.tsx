import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { launchVehicleFixture } from "@/test/fixtures/launchVehicles";
import { baseMission } from "@/test/fixtures/missions";

describe("DashboardClient", () => {
  it("updates mission requirements from form inputs", () => {
    render(
      <DashboardClient
        initialMissions={[baseMission]}
        initialLaunchVehicles={[launchVehicleFixture]}
      />
    );

    const altitudeInput = screen.getByLabelText("Target altitude (km)");
    fireEvent.change(altitudeInput, { target: { value: "600" } });

    expect((altitudeInput as HTMLInputElement).value).toBe("600");
  });

  it("opens mission detail drawer when a table row is clicked", () => {
    const missionTwo = {
      ...baseMission,
      mission_id: "test:2",
      mission_name: "Mission Two",
      launch_date_start: "2026-06-05",
      launch_date_end: "2026-06-05"
    };

    render(
      <DashboardClient
        initialMissions={[baseMission, missionTwo]}
        initialLaunchVehicles={[launchVehicleFixture]}
      />
    );

    fireEvent.click(screen.getByText("Mission Two"));
    expect(screen.getByText("Score breakdown")).toBeInTheDocument();
    expect(screen.getByText("Provider / broker")).toBeInTheDocument();
  });
});
