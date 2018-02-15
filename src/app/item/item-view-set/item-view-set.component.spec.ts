import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewSetComponent } from './item-view-set.component';

describe('ItemViewSetComponent', () => {
  let component: ItemViewSetComponent;
  let fixture: ComponentFixture<ItemViewSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
