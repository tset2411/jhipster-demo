import { IRoom } from 'app/entities/room/room.model';

export interface IResident {
  id?: number;
  residentId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  room?: IRoom | null;
}

export class Resident implements IResident {
  constructor(
    public id?: number,
    public residentId?: number | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public phoneNumber?: string | null,
    public room?: IRoom | null
  ) {}
}

export function getResidentIdentifier(resident: IResident): number | undefined {
  return resident.id;
}
