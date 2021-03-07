import { TestBed } from '@angular/core/testing';

import { DisconnectedService } from './disconnected.service';

describe('DisconnectedService', () => {
  let service: DisconnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisconnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
