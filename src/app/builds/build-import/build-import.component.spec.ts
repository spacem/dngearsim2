import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildImportComponent } from './build-import.component';

describe('BuildImportComponent', () => {
  let component: BuildImportComponent;
  let fixture: ComponentFixture<BuildImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
