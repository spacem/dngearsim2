import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildExportActionComponent } from './build-export-action.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildExportActionComponent', () => {
  let component: BuildExportActionComponent;
  let fixture: ComponentFixture<BuildExportActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
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
