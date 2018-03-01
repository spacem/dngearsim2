import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemIconComponent } from './item-icon.component';
import { TestingModule } from '../../testing/testing.module';

describe('ItemIconComponent', () => {
  let component: ItemIconComponent;
  let fixture: ComponentFixture<ItemIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ItemIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
