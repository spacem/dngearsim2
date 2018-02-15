import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewExtractionComponent } from './item-view-extraction.component';

describe('ItemViewExtractionComponent', () => {
  let component: ItemViewExtractionComponent;
  let fixture: ComponentFixture<ItemViewExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
