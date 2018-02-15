import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditCustomComponent } from './item-edit-custom.component';

describe('ItemEditCustomComponent', () => {
  let component: ItemEditCustomComponent;
  let fixture: ComponentFixture<ItemEditCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
