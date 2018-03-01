import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewAttainmentComponent } from './item-view-attainment.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewAttainmentComponent', () => {
  let component: ItemViewAttainmentComponent;
  let fixture: ComponentFixture<ItemViewAttainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ItemViewAttainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewAttainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
