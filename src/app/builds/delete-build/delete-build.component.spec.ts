import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBuildComponent } from './delete-build.component';
import { TestingModule } from '../../testing/testing.module';

describe('DeleteBuildComponent', () => {
  let component: DeleteBuildComponent;
  let fixture: ComponentFixture<DeleteBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
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
