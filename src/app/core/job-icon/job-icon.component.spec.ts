import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobIconComponent } from './job-icon.component';
import { TestingModule } from '../../testing/testing.module';

describe('JobIconComponent', () => {
  let component: JobIconComponent;
  let fixture: ComponentFixture<JobIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ JobIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
