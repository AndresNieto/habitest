const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const formatCOP = (n: number) => cop.format(n);

/** "$1.850 M" style for compact cards. */
export function formatCOPShort(n: number) {
  if (n >= 1_000_000) {
    const m = new Intl.NumberFormat("es-CO", {
      maximumFractionDigits: 0,
    }).format(n / 1_000_000);
    return `$${m} M`;
  }
  return formatCOP(n);
}

export function formatDate(isoDate: string, opts?: Intl.DateTimeFormatOptions) {
  const d = new Date(isoDate.length === 10 ? `${isoDate}T12:00:00` : isoDate);
  return d.toLocaleDateString(
    "es-CO",
    opts ?? { day: "numeric", month: "short", year: "numeric" },
  );
}
