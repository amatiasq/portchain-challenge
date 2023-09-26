import { useMemo } from 'react';
import { PortData } from '../data-source/loadPortData';
import './DisplayPortData.css';
import { PortsPercentiles } from './PortsPercentiles';
import { SortedList } from './SortedList';

export function DisplayPortData({ portData }: { portData: PortData[] }) {
  const sortedPorts = useMemo(
    () => portData.sort((a, b) => b.portCalls.length - a.portCalls.length),
    [portData]
  );

  const portsWithMostCalls = useMemo(
    () => sortedPorts.slice(0, 5),
    [sortedPorts]
  );

  const portsWithFewestCalls = useMemo(
    () => sortedPorts.slice(-5),
    [sortedPorts]
  );

  return (
    <>
      <SortedList
        className="ports-with-most-calls"
        title="Ports with most calls"
        items={portsWithMostCalls}
      >
        {/*
          This function doesn't need to be passed as children to SortedList
          it could be part of it as it's identical for both lists
          but I'm keeping it here to show the use of generic props
        */}
        {(port) => (
          <li key={port.id}>
            {port.name} ({port.portCalls.length})
          </li>
        )}
      </SortedList>

      <SortedList
        className="ports-with-fewest-calls"
        title="Ports with fewest calls"
        items={portsWithFewestCalls}
      >
        {(port) => (
          <li key={port.id}>
            {port.name} ({port.portCalls.length})
          </li>
        )}
      </SortedList>

      <PortsPercentiles
        className="all-ports"
        portData={portData}
        percentiles={[5, 20, 50, 75, 90]}
      />
    </>
  );
}
