import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadBuildComponent } from './reload-build.component';

describe('ReloadBuildComponent', () => {
  let component: ReloadBuildComponent;
  let fixture: ComponentFixture<ReloadBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
