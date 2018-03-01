import { TestBed, inject } from '@angular/core/testing';

import { StatService } from './stat.service';
import { TestingModule } from '../testing/testing.module';

describe('StatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [StatService]
    });
  });

  it('should be created', inject([StatService], (service: StatService) => {
    expect(service).toBeTruthy();
  }));
});
