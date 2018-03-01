import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewShopComponent } from './item-view-shop.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewShopComponent', () => {
  let component: ItemViewShopComponent;
  let fixture: ComponentFixture<ItemViewShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ItemViewShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
