import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFacility, Facility } from '../facility.model';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'jhi-facility-update',
  templateUrl: './facility-update.component.html',
})
export class FacilityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    facilityId: [],
  });

  constructor(protected facilityService: FacilityService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facility }) => {
      this.updateForm(facility);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facility = this.createFromForm();
    if (facility.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityService.update(facility));
    } else {
      this.subscribeToSaveResponse(this.facilityService.create(facility));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacility>>): void {
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

  protected updateForm(facility: IFacility): void {
    this.editForm.patchValue({
      id: facility.id,
      name: facility.name,
      facilityId: facility.facilityId,
    });
  }

  protected createFromForm(): IFacility {
    return {
      ...new Facility(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      facilityId: this.editForm.get(['facilityId'])!.value,
    };
  }
}
