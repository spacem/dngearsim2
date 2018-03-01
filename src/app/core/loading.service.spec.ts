import { TestBed, inject } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { TestingModule } from '../testing/testing.module';

describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));
});
