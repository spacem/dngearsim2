import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewTransferComponent } from './item-view-transfer.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewTransferComponent', () => {
  let component: ItemViewTransferComponent;
  let fixture: ComponentFixture<ItemViewTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
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
