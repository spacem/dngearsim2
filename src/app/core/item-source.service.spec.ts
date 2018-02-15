import { TestBed, inject } from '@angular/core/testing';

import { ItemSourceService } from './item-source.service';

describe('ItemSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemSourceService]
    });
  });

  it('should be created', inject([ItemSourceService], (service: ItemSourceService) => {
    expect(service).toBeTruthy();
  }));
});
