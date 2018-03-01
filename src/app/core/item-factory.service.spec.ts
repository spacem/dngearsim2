import { TestBed, inject } from '@angular/core/testing';

import { ItemFactoryService } from './item-factory.service';
import { TestingModule } from '../testing/testing.module';

describe('ItemFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ItemFactoryService]
    });
  });

  it('should be created', inject([ItemFactoryService], (service: ItemFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
