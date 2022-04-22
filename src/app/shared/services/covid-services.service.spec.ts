import { TestBed } from '@angular/core/testing';

import { CovidServicesService } from './covid-services.service';

describe('CovidServicesService', () => {
  let service: CovidServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
