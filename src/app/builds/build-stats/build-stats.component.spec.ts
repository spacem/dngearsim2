import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStatsComponent } from './build-stats.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildStatsComponent', () => {
  let component: BuildStatsComponent;
  let fixture: ComponentFixture<BuildStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
