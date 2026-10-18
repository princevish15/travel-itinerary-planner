export function fmtMoney(value, currency = "INR") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(
      Number(value) || 0
    );
  } catch {
    return `${currency} ${Math.round(Number(value) || 0)}`;
  }
}

export function fmtRange(start, end) {
  const f = (d) => new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short" });
  return `${f(start)} - ${f(end)}`;
}

export function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}
