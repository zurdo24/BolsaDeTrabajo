import { TestBed } from '@angular/core/testing';

import { StatusEducationService } from './status-education.service';

describe('StatusEducationService', () => {
  let service: StatusEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
