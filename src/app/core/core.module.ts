import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseClassComponent } from './choose-class/choose-class.component';
import { CategoryLinksComponent } from './category-links/category-links.component';
import { ItemIconComponent } from './item-icon/item-icon.component';
import { ItemLinkComponent } from './item-link/item-link.component';
import { JobIconComponent } from './job-icon/job-icon.component';
import { LoadingComponent } from './loading/loading.component';
import { StatsComponent } from './stats/stats.component';
import { RegionComponent } from './region/region.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChooseClassComponent, CategoryLinksComponent, ItemIconComponent, ItemLinkComponent, JobIconComponent, LoadingComponent, StatsComponent, RegionComponent]
})
export class CoreModule { }
