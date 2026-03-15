import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LaunchVehicleOverviewSection } from "@/components/dashboard/LaunchVehicleOverviewSection";
import { launchVehicleFixture } from "@/test/fixtures/launchVehicles";

describe("LaunchVehicleOverviewSection", () => {
  it("renders required columns and expands rows inline", () => {
    render(<LaunchVehicleOverviewSection records={[launchVehicleFixture]} />);

    expect(screen.getByText("Launcher name")).toBeInTheDocument();
    expect(screen.getByText("Launcher company")).toBeInTheDocument();
    expect(screen.getByText("Launch capability")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Expand Falcon 9"));

    expect(screen.getByText("Basic configuration")).toBeInTheDocument();
    expect(screen.getByText("Capability details")).toBeInTheDocument();
    expect(screen.getByText("Launch location details")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("keeps a single row expanded at a time", () => {
    const second = {
      ...launchVehicleFixture,
      id: "launcher-2",
      launcherName: "Miura 5",
      basicConfiguration: "Two-stage reusable launcher"
    };

    render(<LaunchVehicleOverviewSection records={[launchVehicleFixture, second]} />);

    fireEvent.click(screen.getByLabelText("Expand Falcon 9"));
    expect(screen.getByText("Two-stage partially reusable rocket")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Expand Miura 5"));
    expect(screen.queryByText("Two-stage partially reusable rocket")).not.toBeInTheDocument();
  });
});
