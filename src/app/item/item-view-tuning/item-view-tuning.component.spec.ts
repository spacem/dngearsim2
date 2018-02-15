import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewTuningComponent } from './item-view-tuning.component';

describe('ItemViewTuningComponent', () => {
  let component: ItemViewTuningComponent;
  let fixture: ComponentFixture<ItemViewTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
