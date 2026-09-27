import type { DataSource, NumericWithSource } from "../types/college";

export function formatINR(amount: number | null | undefined): string {
  if (amount == null || Number.isNaN(amount)) return "Fee not available";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(
  value: number | null | undefined,
  fallback = "Data not available"
): string {
  if (value == null || Number.isNaN(value)) return fallback;
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function displayNumeric(
  field: NumericWithSource | undefined,
  fallback = "Data not available"
): string {
  if (!field || field.value == null) return fallback;
  return formatNumber(field.value);
}

export function displayFee(
  field: NumericWithSource | undefined
): string {
  if (!field || field.value == null) return "Fee not available";
  return formatINR(field.value);
}

export function hasSource(field?: { source?: DataSource }): boolean {
  return Boolean(field?.source?.sourceName);
}
