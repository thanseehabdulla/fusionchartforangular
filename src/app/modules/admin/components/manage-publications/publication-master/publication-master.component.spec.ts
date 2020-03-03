import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMasterComponent } from './publication-master.component';

describe('PublicationMasterComponent', () => {
  let component: PublicationMasterComponent;
  let fixture: ComponentFixture<PublicationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
