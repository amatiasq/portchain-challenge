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
    () => sortedPorts.slice(0, 5).map(portDataToSortedListItem),
    [sortedPorts]
  );

  const portsWithFewestCalls = useMemo(
    () => sortedPorts.slice(-5).map(portDataToSortedListItem),
    [sortedPorts]
  );

  return (
    <>
      <SortedList
        className="ports-with-most-calls"
        title="Ports with most calls"
        items={portsWithMostCalls}
      />

      <SortedList
        className="ports-with-fewest-calls"
        title="Ports with fewest calls"
        items={portsWithFewestCalls}
      />

      <PortsPercentiles
        className="all-ports"
        portData={portData}
        percentiles={[5, 20, 50, 75, 90]}
      />
    </>
  );

  function portDataToSortedListItem(portData: PortData) {
    return {
      id: portData.id,
      label: `${portData.name} (${portData.portCalls.length})`,
    };
  }
}
