import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewCraftComponent } from './item-view-craft.component';

describe('ItemViewCraftComponent', () => {
  let component: ItemViewCraftComponent;
  let fixture: ComponentFixture<ItemViewCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
