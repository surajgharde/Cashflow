/** The export renders Indian rupee amounts with grouped digits (₹12,500.00). */
export function formatCurrency(value: number, opts: { decimals?: boolean; symbol?: string } = {}) {
  const { decimals = true, symbol = '₹' } = opts;
  const abs = Math.abs(value);
  const fixed = decimals ? abs.toFixed(2) : Math.round(abs).toString();
  const [whole, frac] = fixed.split('.');

  // Indian digit grouping: last three digits, then pairs (12,50,000).
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}` : last3;

  return `${value < 0 ? '-' : ''}${symbol}${grouped}${frac ? `.${frac}` : ''}`;
}

export function formatSigned(value: number, opts?: { decimals?: boolean }) {
  return `${value >= 0 ? '+' : '-'}${formatCurrency(Math.abs(value), opts)}`;
}

export function formatCompact(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(1)}Cr`;
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(1)}L`;
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`;
  return formatCurrency(value, { decimals: false });
}

export function formatPercent(value: number, decimals = 0) {
  return `${(value * 100).toFixed(decimals)}%`;
}
