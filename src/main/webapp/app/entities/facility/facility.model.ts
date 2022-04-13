import { IRoom } from 'app/entities/room/room.model';

export interface IFacility {
  id?: number;
  name?: string | null;
  facilityId?: number | null;
  rooms?: IRoom[] | null;
}

export class Facility implements IFacility {
  constructor(public id?: number, public name?: string | null, public facilityId?: number | null, public rooms?: IRoom[] | null) {}
}

export function getFacilityIdentifier(facility: IFacility): number | undefined {
  return facility.id;
}
