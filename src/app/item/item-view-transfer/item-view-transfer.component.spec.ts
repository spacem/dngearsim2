import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewTransferComponent } from './item-view-transfer.component';

describe('ItemViewTransferComponent', () => {
  let component: ItemViewTransferComponent;
  let fixture: ComponentFixture<ItemViewTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
