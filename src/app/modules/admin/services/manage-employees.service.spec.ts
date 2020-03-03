import { TestBed } from '@angular/core/testing';

import { ManageEmployeesService } from './manage-employees.service';

describe('ManageEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageEmployeesService = TestBed.get(ManageEmployeesService);
    expect(service).toBeTruthy();
  });
});
