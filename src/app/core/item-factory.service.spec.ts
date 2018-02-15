import { TestBed, inject } from '@angular/core/testing';

import { ItemFactoryService } from './item-factory.service';

describe('ItemFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemFactoryService]
    });
  });

  it('should be created', inject([ItemFactoryService], (service: ItemFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
