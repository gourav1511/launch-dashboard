import { readFile } from "node:fs/promises";
import path from "node:path";
import type {
  AccessMode,
  LaunchStatus,
  LaunchVehicleRecord
} from "@/types/launchVehicles";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "launcher-overview",
  "launch_vehicle_overview_final_v2.csv"
);

const parseCsv = (rawCsv: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < rawCsv.length; i += 1) {
    const char = rawCsv[i];

    if (char === '"') {
      if (inQuotes && rawCsv[i + 1] === '"') {
        currentCell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && rawCsv[i + 1] === "\n") {
        i += 1;
      }
      if (currentCell.length > 0 || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
};

const compactCapabilityText = (value: string): string =>
  value
    .replace(/kgs/gi, "kg")
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*/g, ": ")
    .trim();

const normalizeLaunchStatus = (value: string): { status: LaunchStatus; statusNote: string } => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "operational") {
    return { status: "Operational", statusNote: "" };
  }
  if (normalized === "upcoming") {
    return { status: "Upcoming", statusNote: "" };
  }
  const fallback = value.trim() ? `Original status value: ${value.trim()}` : "";
  return {
    status: "Upcoming",
    statusNote: fallback
  };
};

const normalizeAccessMode = (value: string): AccessMode => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "dedicated") return "Dedicated";
  if (normalized === "rideshare") return "Rideshare";
  if (normalized === "both") return "Both";
  return "Unknown";
};

const toRecord = (row: Record<string, string>, index: number): LaunchVehicleRecord => {
  const rawStatus = row.launch_status ?? "";
  const rawNotes = row.notes?.trim() ?? "";
  const { status, statusNote } = normalizeLaunchStatus(rawStatus);

  const notes = statusNote
    ? rawNotes
      ? `${rawNotes}; ${statusNote}`
      : statusNote
    : rawNotes;

  const launchCapabilityShort = compactCapabilityText(
    row.launch_capability_short?.trim() || row.launch_capability_full?.trim() || "Unknown"
  );

  return {
    id: `${row.launcher_name || "launcher"}-${index}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    launcherName: row.launcher_name?.trim() || "Unknown",
    launcherCompany: row.launcher_company?.trim() || "Unknown",
    launchStatus: status,
    accessMode: normalizeAccessMode(row.access_mode ?? ""),
    launchCapabilityShort,
    launchCapabilityFull: row.launch_capability_full?.trim() || "Unknown",
    launchPlaceShort: row.launch_place_short?.trim() || "Unknown",
    launchPlaceFull: row.launch_place_full?.trim() || "Unknown",
    basicConfiguration: row.basic_configuration?.trim() || "Unknown",
    notes: notes || "None"
  };
};

export const loadLaunchVehicleOverview = async (): Promise<LaunchVehicleRecord[]> => {
  const csvRaw = (await readFile(DATA_FILE_PATH, "utf-8")).replace(/^\uFEFF/, "");
  const rows = parseCsv(csvRaw);
  if (rows.length === 0) return [];

  const [headerRow, ...valueRows] = rows;
  const headers = headerRow.map((value) => value.trim());

  return valueRows
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row, index) => {
      const rowRecord: Record<string, string> = {};
      headers.forEach((header, headerIndex) => {
        rowRecord[header] = row[headerIndex] ?? "";
      });
      return toRecord(rowRecord, index);
    });
};

export const __private__ = {
  parseCsv,
  normalizeAccessMode,
  normalizeLaunchStatus,
  compactCapabilityText
};

