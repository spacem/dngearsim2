import { TestBed, inject } from '@angular/core/testing';

import { DntResetService } from './dnt-reset.service';
import { TestingModule } from '../testing/testing.module';

describe('DntResetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [DntResetService]
    });
  });

  it('should be created', inject([DntResetService], (service: DntResetService) => {
    expect(service).toBeTruthy();
  }));
});
