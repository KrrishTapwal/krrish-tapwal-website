export function compactNumber(n: number) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

/** "13:38" -> "PT13M38S" (schema.org ISO-8601 duration) */
export function isoDuration(d?: string) {
  if (!d) return undefined;
  const parts = d.split(":").map(Number);
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0], parts[1]];
  return `PT${h ? `${h}H` : ""}${m}M${s}S`;
}
