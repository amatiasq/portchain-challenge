export function getPercentil<T>(list: T[], percentile: number) {
  const max = list.length - 1;
  const index = Math.floor((max * percentile) / 100);
  return list[index];
}
