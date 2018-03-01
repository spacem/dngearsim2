import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTalismansComponent } from './build-talismans.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildTalismansComponent', () => {
  let component: BuildTalismansComponent;
  let fixture: ComponentFixture<BuildTalismansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildTalismansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildTalismansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
