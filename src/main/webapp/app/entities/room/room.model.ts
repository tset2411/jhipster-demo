import { IResident } from 'app/entities/resident/resident.model';
import { IFacility } from 'app/entities/facility/facility.model';

export interface IRoom {
  id?: number;
  roomId?: number | null;
  roomNumber?: number | null;
  residents?: IResident[] | null;
  facility?: IFacility | null;
}

export class Room implements IRoom {
  constructor(
    public id?: number,
    public roomId?: number | null,
    public roomNumber?: number | null,
    public residents?: IResident[] | null,
    public facility?: IFacility | null
  ) {}
}

export function getRoomIdentifier(room: IRoom): number | undefined {
  return room.id;
}
