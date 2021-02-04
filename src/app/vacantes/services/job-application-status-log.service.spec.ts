import { TestBed } from '@angular/core/testing';

import { JobApplicationStatusLogService } from './job-application-status-log.service';

describe('JobApplicationStatusLogService', () => {
  let service: JobApplicationStatusLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationStatusLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
