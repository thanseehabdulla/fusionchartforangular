import { TestBed } from '@angular/core/testing';

import { ManagePublicationsService } from './manage-publications.service';

describe('ManagePublicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagePublicationsService = TestBed.get(ManagePublicationsService);
    expect(service).toBeTruthy();
  });
});
