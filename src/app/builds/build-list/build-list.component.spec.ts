import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildListComponent } from './build-list.component';
import { TestingModule } from '../../testing/testing.module';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/translation.service';

describe('BuildListComponent', () => {
  let component: BuildListComponent;
  let fixture: ComponentFixture<BuildListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        TestingModule
      ],
      declarations: [ BuildListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
