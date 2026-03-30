const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
