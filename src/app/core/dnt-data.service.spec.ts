import { TestBed, inject } from '@angular/core/testing';

import { DntDataService } from './dnt-data.service';

describe('DntDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DntDataService]
    });
  });

  it('should be created', inject([DntDataService], (service: DntDataService) => {
    expect(service).toBeTruthy();
  }));
});
