import { TestBed, inject } from '@angular/core/testing';

import { QuickAddService } from './quick-add.service';
import { TestingModule } from '../testing/testing.module';

describe('QuickAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [QuickAddService]
    });
  });

  it('should be created', inject([QuickAddService], (service: QuickAddService) => {
    expect(service).toBeTruthy();
  }));
});
