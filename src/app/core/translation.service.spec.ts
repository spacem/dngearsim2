import { TestBed, inject } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { TestingModule } from '../testing/testing.module';

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [TranslationService]
    });
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));
});
