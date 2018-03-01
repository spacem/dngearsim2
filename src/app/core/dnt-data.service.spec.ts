import { TestBed, inject } from '@angular/core/testing';

import { DntService } from './dnt.service';
import { TestingModule } from '../testing/testing.module';

describe('DntDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [DntService]
    });
  });

  it('should be created', inject([DntService], (service: DntService) => {
    expect(service).toBeTruthy();
  }));
});
