import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { loadLaunchVehicleOverview } from "@/lib/launchVehiclePipeline";
import { loadNormalizedMissions } from "@/lib/missionPipeline";

export default async function HomePage() {
  const [missions, launchVehicles] = await Promise.all([
    loadNormalizedMissions(),
    loadLaunchVehicleOverview()
  ]);

  return (
    <DashboardClient
      initialMissions={missions}
      initialLaunchVehicles={launchVehicles}
    />
  );
}
