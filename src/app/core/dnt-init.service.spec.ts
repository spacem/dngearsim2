import { TestBed, inject } from '@angular/core/testing';

import { DntInitService } from './dnt-init.service';
import { TestingModule } from '../testing/testing.module';

describe('DntInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [DntInitService]
    });
  });

  it('should be created', inject([DntInitService], (service: DntInitService) => {
    expect(service).toBeTruthy();
  }));
});
