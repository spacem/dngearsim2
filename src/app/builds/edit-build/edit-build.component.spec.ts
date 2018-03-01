import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildComponent } from './edit-build.component';
import { TestingModule } from '../../testing/testing.module';

describe('EditBuildComponent', () => {
  let component: EditBuildComponent;
  let fixture: ComponentFixture<EditBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ EditBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
