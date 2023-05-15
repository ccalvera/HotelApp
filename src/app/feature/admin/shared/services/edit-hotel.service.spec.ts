import { TestBed } from '@angular/core/testing';

import { EditHotelService } from './edit-hotel.service';

describe('EditHotelService', () => {
  let service: EditHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
