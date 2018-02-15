import { TestBed, inject } from '@angular/core/testing';

import { DvStatCardService } from './dv-stat-card.service';

describe('DvStatCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DvStatCardService]
    });
  });

  it('should be created', inject([DvStatCardService], (service: DvStatCardService) => {
    expect(service).toBeTruthy();
  }));
});
