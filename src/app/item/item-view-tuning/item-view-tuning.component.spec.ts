import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewTuningComponent } from './item-view-tuning.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewTuningComponent', () => {
  let component: ItemViewTuningComponent;
  let fixture: ComponentFixture<ItemViewTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ItemViewTuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
