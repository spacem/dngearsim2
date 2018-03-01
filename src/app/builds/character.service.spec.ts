import { TestBed, inject } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { TestingModule } from '../testing/testing.module';

describe('CharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [CharacterService]
    });
  });

  it('should be created', inject([CharacterService], (service: CharacterService) => {
    expect(service).toBeTruthy();
  }));
});
