import type { DataSource } from "../types/college";

export const SOURCES = {
  josaa: {
    sourceName: "JoSAA",
    sourceUrl: "https://josaa.nic.in/",
    lastUpdated: "2025-05-01",
  } satisfies DataSource,
  csab: {
    sourceName: "CSAB",
    sourceUrl: "https://csab.nic.in/",
    lastUpdated: "2025-05-01",
  } satisfies DataSource,
  mpDte: {
    sourceName: "MP DTE (Directorate of Technical Education)",
    sourceUrl: "https://dte.mponline.gov.in/",
    lastUpdated: "2025-05-01",
  } satisfies DataSource,
  aicte: {
    sourceName: "AICTE Approval Process",
    sourceUrl: "https://www.aicte-india.org/",
    lastUpdated: "2025-04-15",
  } satisfies DataSource,
  rgpv: {
    sourceName: "RGPV Bhopal",
    sourceUrl: "https://www.rgpv.ac.in/",
    lastUpdated: "2025-04-01",
  } satisfies DataSource,
};

export function unavailable(source: DataSource): {
  value: null;
  source: DataSource;
} {
  return { value: null, source };
}

export function withValue(
  value: number,
  source: DataSource
): { value: number; source: DataSource } {
  return { value, source };
}
