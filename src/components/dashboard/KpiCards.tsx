"use client";

interface KpiCardsProps {
  totalMissions: number;
  averageScore: number;
  highFitCount: number;
  missingDateCount: number;
}

export function KpiCards({
  totalMissions,
  averageScore,
  highFitCount,
  missingDateCount
}: KpiCardsProps) {
  const cards = [
    { label: "Visible Missions", value: String(totalMissions) },
    { label: "Average Score", value: `${averageScore}` },
    { label: "High Fit (>=80)", value: String(highFitCount) },
    { label: "Unknown Date", value: String(missingDateCount) }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-teal-100 bg-teal-50/70 p-4 shadow-soft"
        >
          <p className="text-sm text-slate-600">{card.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
