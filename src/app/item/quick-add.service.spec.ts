import { TestBed, inject } from '@angular/core/testing';

import { QuickAddService } from './quick-add.service';

describe('QuickAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickAddService]
    });
  });

  it('should be created', inject([QuickAddService], (service: QuickAddService) => {
    expect(service).toBeTruthy();
  }));
});
