import { TestBed, inject } from '@angular/core/testing';

import { UiTranslationService } from './ui-translation.service';

describe('UiTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiTranslationService]
    });
  });

  it('should be created', inject([UiTranslationService], (service: UiTranslationService) => {
    expect(service).toBeTruthy();
  }));
});
