import { TestBed, inject } from '@angular/core/testing';

import { ItemCategoryService } from './item-category.service';

describe('ItemCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemCategoryService]
    });
  });

  it('should be created', inject([ItemCategoryService], (service: ItemCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
