import { TestBed, inject } from '@angular/core/testing';

import { DvStatCardService } from './dv-stat-card.service';
import { TestingModule } from '../testing/testing.module';

describe('DvStatCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [DvStatCardService]
    });
  });

  it('should be created', inject([DvStatCardService], (service: DvStatCardService) => {
    expect(service).toBeTruthy();
  }));
});
