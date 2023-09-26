import { api } from './api';
import {
  Port,
  PortCall,
  PortId,
  Schedule,
  Vessel,
  parsePortCall,
} from './api-types';

export interface PortData extends Port {
  portCalls: PortCall[];
}

export async function loadPortData(): Promise<PortData[]> {
  const ports: Record<PortId, PortData> = {};
  const vessels = await api<Vessel[]>('/vessels');

  // TODO: We could split the list in chunks of ~5 and run the requests in parallel
  for (const vessel of vessels) {
    const vesselSchedule = await api<Schedule>(`/schedule/${vessel.imo}`);

    for (const portCall of vesselSchedule.portCalls) {
      const portId = portCall.port.id;

      if (!ports[portId]) {
        ports[portId] = {
          ...portCall.port,
          portCalls: [],
        };
      }

      ports[portId].portCalls.push(parsePortCall(portCall));
    }
  }

  return Object.values(ports);
}
