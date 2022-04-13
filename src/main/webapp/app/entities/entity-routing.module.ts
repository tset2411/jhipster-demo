import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'facility',
        data: { pageTitle: 'Facilities' },
        loadChildren: () => import('./facility/facility.module').then(m => m.FacilityModule),
      },
      {
        path: 'room',
        data: { pageTitle: 'Rooms' },
        loadChildren: () => import('./room/room.module').then(m => m.RoomModule),
      },
      {
        path: 'resident',
        data: { pageTitle: 'Residents' },
        loadChildren: () => import('./resident/resident.module').then(m => m.ResidentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
