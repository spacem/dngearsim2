import { TestBed, inject } from '@angular/core/testing';

import { JobService } from './job.service';
import { TestingModule } from '../testing/testing.module';

describe('JobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [JobService]
    });
  });

  it('should be created', inject([JobService], (service: JobService) => {
    expect(service).toBeTruthy();
  }));
});
