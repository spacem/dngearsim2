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

fdescribe('BuildItemComponent', () => {
  let component: BuildItemComponent;
  let fixture: ComponentFixture<BuildItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule,
        RouterTestingModule
      ],
      declarations: [ BuildItemComponent, ItemLinkComponent, StatsComponent, ItemEditComponent, ItemIconComponent ],
      providers: [ValuesService, RegionService, ExportLinkService, ItemSourceService, TranslateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
