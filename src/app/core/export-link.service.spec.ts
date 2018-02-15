import { TestBed, inject } from '@angular/core/testing';

import { ExportLinkService } from './export-link.service';

describe('ExportLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportLinkService]
    });
  });

  it('should be created', inject([ExportLinkService], (service: ExportLinkService) => {
    expect(service).toBeTruthy();
  }));
});
