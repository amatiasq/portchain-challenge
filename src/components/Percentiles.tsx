import { useMemo } from 'react';
import { getPercentil } from '../util/getPercentil';

type PercentilesProps<T> = {
  data: T[];
  percentiles: number[];
} & (T extends number
  ? // if T is number we don't need a getter and renderer is optional
    {
      getter?: never;
      children?: (data: T) => React.ReactNode;
    }
  : // otherwise both are required
    {
      getter: (data: T) => number;
      children: (data: T) => React.ReactNode;
    });

export function Percentiles<T>({
  data,
  percentiles,
  getter = Number,
  children = Number,
}: PercentilesProps<T>) {
  const columns = useMemo(() => {
    const sortedPortCalls = data.sort((a, b) => getter(a) - getter(b));
    const values = percentiles.map((x) => getPercentil(sortedPortCalls, x));
    return countRepeatedValues(values);
  }, [data, percentiles, getter]);

  return columns.map(({ value, count }, index) => (
    // FIXME: Not sure if we should embed the colSpan behaviour here
    // as it has nothing to do with percentiles
    <td key={percentiles[index]} colSpan={count}>
      {children(value)}
    </td>
  ));
}

function countRepeatedValues<T>(values: T[]): { value: T; count: number }[] {
  const result: { value: T; count: number }[] = [];

  for (const value of values) {
    const last = result.at(-1);

    if (last && last.value === value) {
      last.count++;
    } else {
      result.push({ value, count: 1 });
    }
  }

  return result;
}
