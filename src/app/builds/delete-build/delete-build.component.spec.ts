import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBuildComponent } from './delete-build.component';

describe('DeleteBuildComponent', () => {
  let component: DeleteBuildComponent;
  let fixture: ComponentFixture<DeleteBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
