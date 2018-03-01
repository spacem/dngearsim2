import { TestBed, inject } from '@angular/core/testing';

import { BuildService } from './build.service';
import { TestingModule } from '../testing/testing.module';

describe('BuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      providers: [BuildService]
    });
  });

  it('should be created', inject([BuildService], (service: BuildService) => {
    expect(service).toBeTruthy();
  }));
});
