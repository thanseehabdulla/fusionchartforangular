import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMappingDialogComponent } from './publication-mapping-dialog.component';

describe('PublicationMappingDialogComponent', () => {
  let component: PublicationMappingDialogComponent;
  let fixture: ComponentFixture<PublicationMappingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationMappingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
