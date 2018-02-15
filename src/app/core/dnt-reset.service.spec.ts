import { TestBed, inject } from '@angular/core/testing';

import { DntResetService } from './dnt-reset.service';

describe('DntResetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DntResetService]
    });
  });

  it('should be created', inject([DntResetService], (service: DntResetService) => {
    expect(service).toBeTruthy();
  }));
});
