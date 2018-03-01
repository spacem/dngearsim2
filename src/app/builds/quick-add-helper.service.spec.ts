import { TestBed, inject } from '@angular/core/testing';

import { QuickAddHelperService } from './quick-add-helper.service';
import { TestingModule } from '../testing/testing.module';

describe('QuickAddHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [QuickAddHelperService]
    });
  });

  it('should be created', inject([QuickAddHelperService], (service: QuickAddHelperService) => {
    expect(service).toBeTruthy();
  }));
});
