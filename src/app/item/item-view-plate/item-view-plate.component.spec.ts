import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewPlateComponent } from './item-view-plate.component';

describe('ItemViewPlateComponent', () => {
  let component: ItemViewPlateComponent;
  let fixture: ComponentFixture<ItemViewPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
