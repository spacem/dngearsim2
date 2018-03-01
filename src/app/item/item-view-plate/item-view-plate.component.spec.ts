import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewPlateComponent } from './item-view-plate.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewPlateComponent', () => {
  let component: ItemViewPlateComponent;
  let fixture: ComponentFixture<ItemViewPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
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
