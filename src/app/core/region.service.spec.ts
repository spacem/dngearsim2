import { TestBed, inject } from '@angular/core/testing';

import { RegionService } from './region.service';
import { TestingModule } from '../testing/testing.module';

describe('RegionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [RegionService]
    });
  });

  it('should be created', inject([RegionService], (service: RegionService) => {
    expect(service).toBeTruthy();
  }));
});
