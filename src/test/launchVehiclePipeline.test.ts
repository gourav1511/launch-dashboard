import { describe, expect, it } from "vitest";
import { __private__ } from "@/lib/launchVehiclePipeline";

describe("launch vehicle CSV parser", () => {
  it("handles quoted comma cells and preserves row count", () => {
    const csv =
      "launcher_name,launcher_company,notes\n" +
      'Vehicle A,Company A,"alpha, beta"\n' +
      "Vehicle B,Company B,gamma\n";

    const rows = __private__.parseCsv(csv);
    expect(rows).toHaveLength(3);
    expect(rows[1][2]).toBe("alpha, beta");
  });
});

describe("launch vehicle normalizers", () => {
  it("normalizes status and coerces unknown values", () => {
    expect(__private__.normalizeLaunchStatus("Operational").status).toBe(
      "Operational"
    );

    const fallback = __private__.normalizeLaunchStatus("In Development");
    expect(fallback.status).toBe("Upcoming");
    expect(fallback.statusNote).toContain("Original status value");
  });

  it("normalizes access mode with fallback to Unknown", () => {
    expect(__private__.normalizeAccessMode("Dedicated")).toBe("Dedicated");
    expect(__private__.normalizeAccessMode("hybrid")).toBe("Unknown");
  });

  it("cleans short capability formatting", () => {
    expect(__private__.compactCapabilityText("LEO : 2200 kgs")).toBe("LEO: 2200 kg");
  });
});
