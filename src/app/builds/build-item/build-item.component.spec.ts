import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildItemComponent } from './build-item.component';
import { ItemLinkComponent } from '../../core/item-link/item-link.component';
import { StatsComponent } from '../../core/stats/stats.component';
import { ItemEditComponent } from '../../item/item-edit/item-edit.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemIconComponent } from '../../core/item-icon/item-icon.component';
import { ValuesService } from '../../core/values.service';
import { RegionService } from '../../core/region.service';
import { ExportLinkService } from '../../core/export-link.service';
import { ItemSourceService } from '../../core/item-source.service';
import { TestingModule } from '../../testing/testing.module';

describe('BuildItemComponent', () => {
  let component: BuildItemComponent;
  let fixture: ComponentFixture<BuildItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [ BuildItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildItemComponent);
    component = fixture.componentInstance;
    component.item = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
