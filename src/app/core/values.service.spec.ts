import { TestBed, inject } from '@angular/core/testing';

import { ValuesService } from './values.service';
import { TestingModule } from '../testing/testing.module';

describe('ValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ValuesService]
    });
  });

  it('should be created', inject([ValuesService], (service: ValuesService) => {
    expect(service).toBeTruthy();
  }));
});
