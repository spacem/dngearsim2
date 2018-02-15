import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditEnchantmentComponent } from './item-edit-enchantment.component';

describe('ItemEditEnchantmentComponent', () => {
  let component: ItemEditEnchantmentComponent;
  let fixture: ComponentFixture<ItemEditEnchantmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditEnchantmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditEnchantmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
