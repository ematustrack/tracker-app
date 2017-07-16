import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraStFolioComponent } from './obra-st-folio.component';

describe('ObraStFolioComponent', () => {
  let component: ObraStFolioComponent;
  let fixture: ComponentFixture<ObraStFolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraStFolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraStFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
