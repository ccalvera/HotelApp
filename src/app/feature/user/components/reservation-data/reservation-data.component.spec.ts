import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDataComponent } from './reservation-data.component';

describe('ReservationDataComponent', () => {
  let component: ReservationDataComponent;
  let fixture: ComponentFixture<ReservationDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDataComponent]
    });
    fixture = TestBed.createComponent(ReservationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
