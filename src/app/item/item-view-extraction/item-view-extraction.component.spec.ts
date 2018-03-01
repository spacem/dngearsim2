import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewExtractionComponent } from './item-view-extraction.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemViewExtractionComponent', () => {
  let component: ItemViewExtractionComponent;
  let fixture: ComponentFixture<ItemViewExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ItemViewExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
