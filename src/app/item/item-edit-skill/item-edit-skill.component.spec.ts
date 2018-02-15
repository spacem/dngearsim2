import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditSkillComponent } from './item-edit-skill.component';

describe('ItemEditSkillComponent', () => {
  let component: ItemEditSkillComponent;
  let fixture: ComponentFixture<ItemEditSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
