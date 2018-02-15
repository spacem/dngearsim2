import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditTalismanComponent } from './item-edit-talisman.component';

describe('ItemEditTalismanComponent', () => {
  let component: ItemEditTalismanComponent;
  let fixture: ComponentFixture<ItemEditTalismanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditTalismanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditTalismanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
