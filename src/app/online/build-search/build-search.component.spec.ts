import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSearchComponent } from './build-search.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildSearchComponent', () => {
  let component: BuildSearchComponent;
  let fixture: ComponentFixture<BuildSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
