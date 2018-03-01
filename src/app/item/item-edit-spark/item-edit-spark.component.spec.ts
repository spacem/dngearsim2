import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditSparkComponent } from './item-edit-spark.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemEditSparkComponent', () => {
  let component: ItemEditSparkComponent;
  let fixture: ComponentFixture<ItemEditSparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
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
