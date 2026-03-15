import type { DatePrecision, NormalizedMission } from "@/types/missions";

const asDateLabel = (value: string | null): string => {
  if (!value) return "Unknown";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const precisionLabels: Record<DatePrecision, string> = {
  exact: "Exact",
  window: "Window",
  net: "NET",
  tbd: "TBD",
  unknown: "Unknown"
};

export const formatLaunchWindow = (mission: NormalizedMission): string => {
  const startLabel = asDateLabel(mission.launch_date_start);
  const endLabel = asDateLabel(mission.launch_date_end);

  if (startLabel === "Unknown" && endLabel === "Unknown") return "Unknown";
  if (
    mission.launch_date_start &&
    mission.launch_date_end &&
    mission.launch_date_start !== mission.launch_date_end
  ) {
    return `${startLabel} - ${endLabel}`;
  }

  return startLabel;
};

export const formatLastUpdated = (value: string | null): string => {
  if (!value) return "Unknown";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown";
  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const formatNumber = (value: number | null, unit?: string): string => {
  if (value === null || !Number.isFinite(value)) return "Unknown";
  return unit ? `${value} ${unit}` : String(value);
};

export const getDatePrecisionLabel = (precision: DatePrecision): string =>
  precisionLabels[precision];
