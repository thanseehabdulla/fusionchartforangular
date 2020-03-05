import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationMappingComponent } from './publication-mapping.component';

describe('PublicationMappingComponent', () => {
  let component: PublicationMappingComponent;
  let fixture: ComponentFixture<PublicationMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
