import { TestBed } from '@angular/core/testing';

import { JobOpeningStatusService } from './job-opening-status.service';

describe('JobOpeningStatusService', () => {
  let service: JobOpeningStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOpeningStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
