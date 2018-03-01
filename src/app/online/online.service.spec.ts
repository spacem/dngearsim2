import { TestBed, inject } from '@angular/core/testing';

import { OnlineService } from './online.service';
import { TestingModule } from '../testing/testing.module';

describe('OnlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [OnlineService]
    });
  });

  it('should be created', inject([OnlineService], (service: OnlineService) => {
    expect(service).toBeTruthy();
  }));
});
