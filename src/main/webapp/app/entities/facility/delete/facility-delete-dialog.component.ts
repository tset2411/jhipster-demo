import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacility } from '../facility.model';
import { FacilityService } from '../service/facility.service';

@Component({
  templateUrl: './facility-delete-dialog.component.html',
})
export class FacilityDeleteDialogComponent {
  facility?: IFacility;

  constructor(protected facilityService: FacilityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facilityService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
