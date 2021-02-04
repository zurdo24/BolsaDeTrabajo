import { TestBed } from '@angular/core/testing';

import { OpeningSkillService } from './opening-skill.service';

describe('OpeningSkillService', () => {
  let service: OpeningSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
