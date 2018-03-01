import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAssignmentComponent } from './build-assignment.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildAssignmentComponent', () => {
  let component: BuildAssignmentComponent;
  let fixture: ComponentFixture<BuildAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
