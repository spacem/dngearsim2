import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildItemListComponent } from './build-item-list.component';

describe('BuildItemListComponent', () => {
  let component: BuildItemListComponent;
  let fixture: ComponentFixture<BuildItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
