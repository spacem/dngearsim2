import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildActionsComponent } from './build-actions.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildActionsComponent', () => {
  let component: BuildActionsComponent;
  let fixture: ComponentFixture<BuildActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
