import { TestBed } from '@angular/core/testing';

import { ReservedTripsService } from './reserved-trips.service';

describe('ReservedTripsService', () => {
  let service: ReservedTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservedTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
