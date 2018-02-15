import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditPotentialComponent } from './item-edit-potential.component';

describe('ItemEditPotentialComponent', () => {
  let component: ItemEditPotentialComponent;
  let fixture: ComponentFixture<ItemEditPotentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditPotentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditPotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
