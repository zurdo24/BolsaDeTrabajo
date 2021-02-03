import { TestBed } from '@angular/core/testing';

import { SubjectAreaService } from './subject-area.service';

describe('SubjectAreaService', () => {
  let service: SubjectAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
