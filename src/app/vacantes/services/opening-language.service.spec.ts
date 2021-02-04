import { TestBed } from '@angular/core/testing';

import { OpeningLanguageService } from './opening-language.service';

describe('OpeningLanguageService', () => {
  let service: OpeningLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
