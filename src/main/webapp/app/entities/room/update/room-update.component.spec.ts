import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RoomService } from '../service/room.service';
import { IRoom, Room } from '../room.model';
import { IFacility } from 'app/entities/facility/facility.model';
import { FacilityService } from 'app/entities/facility/service/facility.service';

import { RoomUpdateComponent } from './room-update.component';

describe('Room Management Update Component', () => {
  let comp: RoomUpdateComponent;
  let fixture: ComponentFixture<RoomUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let roomService: RoomService;
  let facilityService: FacilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RoomUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RoomUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RoomUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    roomService = TestBed.inject(RoomService);
    facilityService = TestBed.inject(FacilityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Facility query and add missing value', () => {
      const room: IRoom = { id: 456 };
      const facility: IFacility = { id: 60905 };
      room.facility = facility;

      const facilityCollection: IFacility[] = [{ id: 10018 }];
      jest.spyOn(facilityService, 'query').mockReturnValue(of(new HttpResponse({ body: facilityCollection })));
      const additionalFacilities = [facility];
      const expectedCollection: IFacility[] = [...additionalFacilities, ...facilityCollection];
      jest.spyOn(facilityService, 'addFacilityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ room });
      comp.ngOnInit();

      expect(facilityService.query).toHaveBeenCalled();
      expect(facilityService.addFacilityToCollectionIfMissing).toHaveBeenCalledWith(facilityCollection, ...additionalFacilities);
      expect(comp.facilitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const room: IRoom = { id: 456 };
      const facility: IFacility = { id: 18997 };
      room.facility = facility;

      activatedRoute.data = of({ room });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(room));
      expect(comp.facilitiesSharedCollection).toContain(facility);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Room>>();
      const room = { id: 123 };
      jest.spyOn(roomService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ room });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: room }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(roomService.update).toHaveBeenCalledWith(room);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Room>>();
      const room = new Room();
      jest.spyOn(roomService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ room });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: room }));
      saveSubject.complete();

      // THEN
      expect(roomService.create).toHaveBeenCalledWith(room);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Room>>();
      const room = { id: 123 };
      jest.spyOn(roomService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ room });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(roomService.update).toHaveBeenCalledWith(room);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFacilityById', () => {
      it('Should return tracked Facility primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFacilityById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
