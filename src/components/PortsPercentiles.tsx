import { useMemo } from 'react';
import { PortData } from '../data-source/loadPortData';
import { formatDuration } from '../util/formatDuration';
import { getPercentil } from '../util/getPercentil';
import './PortsPercentiles.css';

interface PortsPercentilesProps {
  className?: string;
  portData: PortData[];
  percentiles: number[];
}

export function PortsPercentiles({
  className,
  portData,
  percentiles,
}: PortsPercentilesProps) {
  return (
    <section className={className}>
      <h2>All ports percentiles</h2>

      <table>
        <thead>
          <tr>
            <th>Port</th>
            {percentiles.map((x) => (
              <th key={x}>{x}th</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {portData.map((port) => (
            <SinglePortPercentiles
              key={port.id}
              port={port}
              percentiles={percentiles}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

// Private component
function SinglePortPercentiles({
  port,
  percentiles,
}: {
  port: PortData;
  percentiles: number[];
}) {
  const portCallsToDisplay = useMemo(() => {
    const sortedPortCalls = port.portCalls.sort(
      (a, b) => a.duration - b.duration
    );

    return percentiles.map((x) => getPercentil(sortedPortCalls, x));
  }, [port, percentiles]);

  const columns = countRepeatedValues(portCallsToDisplay);

  return (
    <tr>
      <th>{port.name}</th>
      {columns.map(({ value, count }, index) => (
        <td key={percentiles[index]} colSpan={count}>
          {formatDuration(value.duration)}
        </td>
      ))}
    </tr>
  );
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
