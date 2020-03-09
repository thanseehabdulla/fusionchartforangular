import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeesDailogComponent } from './manage-employees-dailog.component';

describe('ManageEmployeesDailogComponent', () => {
  let component: ManageEmployeesDailogComponent;
  let fixture: ComponentFixture<ManageEmployeesDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEmployeesDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmployeesDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
