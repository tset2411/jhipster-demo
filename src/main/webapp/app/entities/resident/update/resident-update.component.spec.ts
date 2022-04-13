import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ResidentService } from '../service/resident.service';
import { IResident, Resident } from '../resident.model';
import { IRoom } from 'app/entities/room/room.model';
import { RoomService } from 'app/entities/room/service/room.service';

import { ResidentUpdateComponent } from './resident-update.component';

describe('Resident Management Update Component', () => {
  let comp: ResidentUpdateComponent;
  let fixture: ComponentFixture<ResidentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let residentService: ResidentService;
  let roomService: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ResidentUpdateComponent],
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
      .overrideTemplate(ResidentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResidentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    residentService = TestBed.inject(ResidentService);
    roomService = TestBed.inject(RoomService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Room query and add missing value', () => {
      const resident: IResident = { id: 456 };
      const room: IRoom = { id: 88725 };
      resident.room = room;

      const roomCollection: IRoom[] = [{ id: 47370 }];
      jest.spyOn(roomService, 'query').mockReturnValue(of(new HttpResponse({ body: roomCollection })));
      const additionalRooms = [room];
      const expectedCollection: IRoom[] = [...additionalRooms, ...roomCollection];
      jest.spyOn(roomService, 'addRoomToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ resident });
      comp.ngOnInit();

      expect(roomService.query).toHaveBeenCalled();
      expect(roomService.addRoomToCollectionIfMissing).toHaveBeenCalledWith(roomCollection, ...additionalRooms);
      expect(comp.roomsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const resident: IResident = { id: 456 };
      const room: IRoom = { id: 6040 };
      resident.room = room;

      activatedRoute.data = of({ resident });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(resident));
      expect(comp.roomsSharedCollection).toContain(room);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Resident>>();
      const resident = { id: 123 };
      jest.spyOn(residentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resident });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resident }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(residentService.update).toHaveBeenCalledWith(resident);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Resident>>();
      const resident = new Resident();
      jest.spyOn(residentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resident });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: resident }));
      saveSubject.complete();

      // THEN
      expect(residentService.create).toHaveBeenCalledWith(resident);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Resident>>();
      const resident = { id: 123 };
      jest.spyOn(residentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ resident });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(residentService.update).toHaveBeenCalledWith(resident);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRoomById', () => {
      it('Should return tracked Room primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRoomById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
