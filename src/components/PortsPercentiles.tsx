import { PortData } from '../data-source/loadPortData';
import { formatDuration } from '../util/formatDuration';
import { Percentiles } from './Percentiles';
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
  return (
    <tr>
      <th>{port.name}</th>
      <Percentiles
        data={port.portCalls}
        percentiles={percentiles}
        getter={(portCall) => portCall.duration}
      >
        {(portCall) => formatDuration(portCall.duration)}
      </Percentiles>
    </tr>
  );
}
