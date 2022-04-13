import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRoom, Room } from '../room.model';
import { RoomService } from '../service/room.service';

@Injectable({ providedIn: 'root' })
export class RoomRoutingResolveService implements Resolve<IRoom> {
  constructor(protected service: RoomService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRoom> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((room: HttpResponse<Room>) => {
          if (room.body) {
            return of(room.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Room());
  }
}
