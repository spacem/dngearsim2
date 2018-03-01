import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildImportComponent } from './build-import.component';
import { TestingModule } from '../../testing/testing.module';

describe('BuildImportComponent', () => {
  let component: BuildImportComponent;
  let fixture: ComponentFixture<BuildImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ BuildImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
