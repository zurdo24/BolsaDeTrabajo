import { TestBed } from '@angular/core/testing';

import { LineBusinessService } from './line-business.service';

describe('LineBusinessService', () => {
  let service: LineBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
