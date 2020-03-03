import { TestBed } from '@angular/core/testing';

import { PublicationMasterService } from './publication-master.service';

describe('PublicationMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicationMasterService = TestBed.get(PublicationMasterService);
    expect(service).toBeTruthy();
  });
});
