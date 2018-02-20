import { TestBed, inject } from '@angular/core/testing';

import { DntService } from './dnt.service';

describe('DntDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DntService]
    });
  });

  it('should be created', inject([DntService], (service: DntService) => {
    expect(service).toBeTruthy();
  }));
});
