export function addMinutesToDate(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export function compare(a: Date, b: Date) {
  return a < b;
}
