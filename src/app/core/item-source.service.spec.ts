import { TestBed, inject } from '@angular/core/testing';

import { ItemSourceService } from './item-source.service';
import { TestingModule } from '../testing/testing.module';

describe('ItemSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ItemSourceService]
    });
  });

  it('should be created', inject([ItemSourceService], (service: ItemSourceService) => {
    expect(service).toBeTruthy();
  }));
});
