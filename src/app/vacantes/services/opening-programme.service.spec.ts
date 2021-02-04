import { TestBed } from '@angular/core/testing';

import { OpeningProgrammeService } from './opening-programme.service';

describe('OpeningProgrammeService', () => {
  let service: OpeningProgrammeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningProgrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
