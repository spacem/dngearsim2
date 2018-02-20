import { TestBed, inject } from '@angular/core/testing';

import { QuickAddHelperService } from './quick-add-helper.service';

describe('QuickAddHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickAddHelperService]
    });
  });

  it('should be created', inject([QuickAddHelperService], (service: QuickAddHelperService) => {
    expect(service).toBeTruthy();
  }));
});
