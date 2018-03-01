import { TestBed, inject } from '@angular/core/testing';

import { ExportLinkService } from './export-link.service';
import { TestingModule } from '../testing/testing.module';

describe('ExportLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ExportLinkService]
    });
  });

  it('should be created', inject([ExportLinkService], (service: ExportLinkService) => {
    expect(service).toBeTruthy();
  }));
});
