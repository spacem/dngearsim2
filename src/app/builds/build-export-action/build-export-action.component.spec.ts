import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildExportActionComponent } from './build-export-action.component';

describe('BuildExportActionComponent', () => {
  let component: BuildExportActionComponent;
  let fixture: ComponentFixture<BuildExportActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildExportActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildExportActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
