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

  return (
    <tr>
      <th>{port.name}</th>
      {portCallsToDisplay.map((portCall, index) => (
        <td key={percentiles[index]}>{formatDuration(portCall.duration)}</td>
      ))}
    </tr>
  );
}
