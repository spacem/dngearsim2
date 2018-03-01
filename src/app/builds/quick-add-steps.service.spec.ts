import { TestBed, inject } from '@angular/core/testing';

import { QuickAddStepsService } from './quick-add-steps.service';
import { TestingModule } from '../testing/testing.module';

describe('QuickAddStepsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [QuickAddStepsService]
    });
  });

  it('should be created', inject([QuickAddStepsService], (service: QuickAddStepsService) => {
    expect(service).toBeTruthy();
  }));
});
