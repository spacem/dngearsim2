import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSearchComponent } from './skill-search.component';
import { TestingModule } from '../../testing/testing.module';

describe('SkillSearchComponent', () => {
  let component: SkillSearchComponent;
  let fixture: ComponentFixture<SkillSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ SkillSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
