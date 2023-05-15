import { TestBed } from '@angular/core/testing';

import { HotelManagementService } from './hotel-management.service';

describe('HotelManagementService', () => {
  let service: HotelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
