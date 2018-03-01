import { TestBed, inject } from '@angular/core/testing';

import { UiTranslationService } from './ui-translation.service';
import { TestingModule } from '../testing/testing.module';

describe('UiTranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [UiTranslationService]
    });
  });

  it('should be created', inject([UiTranslationService], (service: UiTranslationService) => {
    expect(service).toBeTruthy();
  }));
});
