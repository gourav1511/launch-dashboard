"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface LaunchesByMonthDatum {
  month: string;
  launches: number;
}

interface LauncherBreakdownDatum {
  launcher: string;
  count: number;
}

interface ScoreDistributionDatum {
  range: string;
  missions: number;
}

interface SummaryChartsProps {
  launchesByMonth: LaunchesByMonthDatum[];
  launcherBreakdown: LauncherBreakdownDatum[];
  scoreDistribution: ScoreDistributionDatum[];
}

const pieColors = ["#0f766e", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#059669"];

export function SummaryCharts({
  launchesByMonth,
  launcherBreakdown,
  scoreDistribution
}: SummaryChartsProps) {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-panel">
        <h3 className="mb-3 text-lg font-semibold">Launches by Month</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={launchesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="launches" fill="#0f766e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-panel">
        <h3 className="mb-3 text-lg font-semibold">Launcher Family Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={launcherBreakdown}
                dataKey="count"
                nameKey="launcher"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                label
              >
                {launcherBreakdown.map((datum, index) => (
                  <Cell
                    key={`launcher-${datum.launcher}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-panel">
        <h3 className="mb-3 text-lg font-semibold">Score Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="missions" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
