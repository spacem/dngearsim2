import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClassComponent } from './choose-class.component';
import { TestingModule } from '../../testing/testing.module';

describe('ChooseClassComponent', () => {
  let component: ChooseClassComponent;
  let fixture: ComponentFixture<ChooseClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      declarations: [ ChooseClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
