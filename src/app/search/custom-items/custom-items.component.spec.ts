import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomItemsComponent } from './custom-items.component';
import { TestingModule } from '../../testing/testing.module';

describe('CustomItemsComponent', () => {
  let component: CustomItemsComponent;
  let fixture: ComponentFixture<CustomItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ CustomItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
