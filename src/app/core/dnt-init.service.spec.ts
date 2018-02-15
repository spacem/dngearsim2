import { TestBed, inject } from '@angular/core/testing';

import { DntInitService } from './dnt-init.service';

describe('DntInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DntInitService]
    });
  });

  it('should be created', inject([DntInitService], (service: DntInitService) => {
    expect(service).toBeTruthy();
  }));
});
