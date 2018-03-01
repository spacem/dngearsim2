import { TestBed, inject } from '@angular/core/testing';

import { ItemCategoryService } from './item-category.service';
import { TestingModule } from '../testing/testing.module';

describe('ItemCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ItemCategoryService]
    });
  });

  it('should be created', inject([ItemCategoryService], (service: ItemCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
