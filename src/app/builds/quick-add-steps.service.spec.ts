import { TestBed, inject } from '@angular/core/testing';

import { QuickAddStepsService } from './quick-add-steps.service';

describe('QuickAddStepsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickAddStepsService]
    });
  });

  it('should be created', inject([QuickAddStepsService], (service: QuickAddStepsService) => {
    expect(service).toBeTruthy();
  }));
});
