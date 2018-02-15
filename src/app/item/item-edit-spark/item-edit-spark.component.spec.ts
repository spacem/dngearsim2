import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditSparkComponent } from './item-edit-spark.component';

describe('ItemEditSparkComponent', () => {
  let component: ItemEditSparkComponent;
  let fixture: ComponentFixture<ItemEditSparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditSparkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditSparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
