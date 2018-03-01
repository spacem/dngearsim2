import { TestBed, inject } from '@angular/core/testing';

import { SaveService } from './save.service';
import { TestingModule } from '../testing/testing.module';

describe('SaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [SaveService]
    });
  });

  it('should be created', inject([SaveService], (service: SaveService) => {
    expect(service).toBeTruthy();
  }));
});
