import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRoom, Room } from '../room.model';
import { RoomService } from '../service/room.service';
import { IFacility } from 'app/entities/facility/facility.model';
import { FacilityService } from 'app/entities/facility/service/facility.service';

@Component({
  selector: 'jhi-room-update',
  templateUrl: './room-update.component.html',
})
export class RoomUpdateComponent implements OnInit {
  isSaving = false;

  facilitiesSharedCollection: IFacility[] = [];

  editForm = this.fb.group({
    id: [],
    roomId: [],
    roomNumber: [],
    facility: [],
  });

  constructor(
    protected roomService: RoomService,
    protected facilityService: FacilityService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ room }) => {
      this.updateForm(room);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const room = this.createFromForm();
    if (room.id !== undefined) {
      this.subscribeToSaveResponse(this.roomService.update(room));
    } else {
      this.subscribeToSaveResponse(this.roomService.create(room));
    }
  }

  trackFacilityById(_index: number, item: IFacility): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(room: IRoom): void {
    this.editForm.patchValue({
      id: room.id,
      roomId: room.roomId,
      roomNumber: room.roomNumber,
      facility: room.facility,
    });

    this.facilitiesSharedCollection = this.facilityService.addFacilityToCollectionIfMissing(this.facilitiesSharedCollection, room.facility);
  }

  protected loadRelationshipsOptions(): void {
    this.facilityService
      .query()
      .pipe(map((res: HttpResponse<IFacility[]>) => res.body ?? []))
      .pipe(
        map((facilities: IFacility[]) =>
          this.facilityService.addFacilityToCollectionIfMissing(facilities, this.editForm.get('facility')!.value)
        )
      )
      .subscribe((facilities: IFacility[]) => (this.facilitiesSharedCollection = facilities));
  }

  protected createFromForm(): IRoom {
    return {
      ...new Room(),
      id: this.editForm.get(['id'])!.value,
      roomId: this.editForm.get(['roomId'])!.value,
      roomNumber: this.editForm.get(['roomNumber'])!.value,
      facility: this.editForm.get(['facility'])!.value,
    };
  }
}
