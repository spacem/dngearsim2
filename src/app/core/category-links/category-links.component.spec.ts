import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLinksComponent } from './category-links.component';
import { TestingModule } from '../../testing/testing.module';

describe('CategoryLinksComponent', () => {
  let component: CategoryLinksComponent;
  let fixture: ComponentFixture<CategoryLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ CategoryLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
