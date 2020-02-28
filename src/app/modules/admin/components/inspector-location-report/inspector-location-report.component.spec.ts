import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorLocationReportComponent } from './inspector-location-report.component';

describe('InspectorLocationReportComponent', () => {
  let component: InspectorLocationReportComponent;
  let fixture: ComponentFixture<InspectorLocationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorLocationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
