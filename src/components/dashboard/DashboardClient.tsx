"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { FilterToolbar } from "@/components/dashboard/FilterToolbar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { LaunchVehicleOverviewSection } from "@/components/dashboard/LaunchVehicleOverviewSection";
import { MissionDetailDrawer } from "@/components/dashboard/MissionDetailDrawer";
import { MissionsTable } from "@/components/dashboard/MissionsTable";
import { RequirementsPanel } from "@/components/dashboard/RequirementsPanel";
import { SummaryCharts } from "@/components/dashboard/SummaryCharts";
import type { RankedMission } from "@/components/dashboard/types";
import { getLaunchesByMonthData, getLauncherBreakdownData, getScoreDistributionData } from "@/lib/charting";
import { defaultMissionFilters, defaultMissionRequirements } from "@/lib/defaultState";
import { applyMissionFilters, sortMissions } from "@/lib/missionRanking";
import { scoreMissions } from "@/scoring";
import type { MissionFilters, NormalizedMission, SortKey } from "@/types/missions";
import type { LaunchVehicleRecord } from "@/types/launchVehicles";

interface DashboardClientProps {
  initialMissions: NormalizedMission[];
  initialLaunchVehicles: LaunchVehicleRecord[];
}

const uniqueValues = (
  missions: NormalizedMission[],
  extractor: (mission: NormalizedMission) => string | null
): string[] => {
  const values = new Set<string>();
  missions.forEach((mission) => {
    const value = extractor(mission);
    values.add(value?.trim() || "Unknown");
  });
  return Array.from(values).sort((a, b) => a.localeCompare(b));
};

export function DashboardClient({
  initialMissions,
  initialLaunchVehicles
}: DashboardClientProps) {
  const [requirements, setRequirements] = useState(defaultMissionRequirements);
  const [filters, setFilters] = useState<MissionFilters>(defaultMissionFilters);
  const [sortKey, setSortKey] = useState<SortKey>("score_desc");
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  const scoredMissions = useMemo(
    () => scoreMissions(initialMissions, requirements),
    [initialMissions, requirements]
  );
  const filteredMissions = useMemo(
    () => applyMissionFilters(scoredMissions, filters),
    [scoredMissions, filters]
  );
  const sortedMissions = useMemo(
    () => sortMissions(filteredMissions, sortKey),
    [filteredMissions, sortKey]
  );

  const rankedMissions: RankedMission[] = useMemo(
    () =>
      sortedMissions.map((mission, index) => ({
        ...mission,
        rank: index + 1
      })),
    [sortedMissions]
  );

  const selectedMission =
    rankedMissions.find((mission) => mission.mission_id === selectedMissionId) || null;

  const launchesByMonthData = useMemo(
    () => getLaunchesByMonthData(filteredMissions),
    [filteredMissions]
  );
  const launcherBreakdownData = useMemo(
    () => getLauncherBreakdownData(filteredMissions),
    [filteredMissions]
  );
  const scoreDistributionData = useMemo(
    () => getScoreDistributionData(filteredMissions),
    [filteredMissions]
  );

  const averageScore = rankedMissions.length
    ? Math.round(
        rankedMissions.reduce((sum, mission) => sum + mission.overall_score, 0) /
          rankedMissions.length
      )
    : 0;
  const highFitCount = rankedMissions.filter((mission) => mission.overall_score >= 80).length;
  const missingDateCount = rankedMissions.filter(
    (mission) => !mission.launch_date_start && !mission.launch_date_end
  ).length;

  const launcherFamilies = useMemo(
    () => uniqueValues(scoredMissions, (mission) => mission.launcher_family),
    [scoredMissions]
  );
  const launchSites = useMemo(
    () => uniqueValues(scoredMissions, (mission) => mission.launch_site),
    [scoredMissions]
  );
  const orbitTypes = useMemo(
    () => uniqueValues(scoredMissions, (mission) => mission.orbit_type),
    [scoredMissions]
  );

  const clearFilters = () => setFilters(defaultMissionFilters);

  return (
    <main className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-6 lg:px-8">
      <header className="mb-2">        <h1 className="mt-1 text-3xl font-semibold">Launch Opportunity Dashboard</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Scan upcoming launch opportunities, compare mission-fit scores, and inspect
          score transparency before follow-up.
        </p>
      </header>

      <RequirementsPanel requirements={requirements} onChange={setRequirements} />
      <FilterToolbar
        filters={filters}
        onFiltersChange={setFilters}
        sortKey={sortKey}
        onSortChange={setSortKey}
        launcherFamilies={launcherFamilies}
        launchSites={launchSites}
        orbitTypes={orbitTypes}
        onClear={clearFilters}
      />

      <KpiCards
        totalMissions={rankedMissions.length}
        averageScore={averageScore}
        highFitCount={highFitCount}
        missingDateCount={missingDateCount}
      />

      <SummaryCharts
        launchesByMonth={launchesByMonthData}
        launcherBreakdown={launcherBreakdownData}
        scoreDistribution={scoreDistributionData}
      />

      {rankedMissions.length === 0 ? (
        <EmptyState
          requirements={requirements}
          filters={filters}
          onResetFilters={clearFilters}
        />
      ) : (
        <MissionsTable
          missions={rankedMissions}
          onRowClick={(mission) => setSelectedMissionId(mission.mission_id)}
        />
      )}

      <LaunchVehicleOverviewSection records={initialLaunchVehicles} />

      <MissionDetailDrawer
        mission={selectedMission}
        onClose={() => setSelectedMissionId(null)}
      />
    </main>
  );
}

