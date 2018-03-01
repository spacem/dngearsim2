import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EverythingSearchComponent } from './everything-search.component';
import { TestingModule } from '../../testing/testing.module';
import { TranslateModule } from '@ngx-translate/core';

describe('EverythingSearchComponent', () => {
  let component: EverythingSearchComponent;
  let fixture: ComponentFixture<EverythingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule, TranslateModule.forChild() ],
      declarations: [ EverythingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EverythingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
