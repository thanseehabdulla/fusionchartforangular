import { TestBed } from '@angular/core/testing';

import { ManageAgentsService } from './manage-agents.service';

describe('ManageAgentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageAgentsService = TestBed.get(ManageAgentsService);
    expect(service).toBeTruthy();
  });
});
