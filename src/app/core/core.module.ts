import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseClassComponent } from './choose-class/choose-class.component';
import { CategoryLinksComponent } from './category-links/category-links.component';
import { ItemIconComponent } from './item-icon/item-icon.component';
import { ItemLinkComponent } from './item-link/item-link.component';
import { JobIconComponent } from './job-icon/job-icon.component';
import { LoadingComponent } from './loading/loading.component';
import { StatsComponent } from './stats/stats.component';
import { RegionComponent } from './region/region.component';
import { TranslationService } from './translation.service';
import { RegionService } from './region.service';
import { DntService } from './dnt.service';
import { DntInitService } from './dnt-init.service';
import { DntResetService } from './dnt-reset.service';
import { ExportLinkService } from './export-link.service';
import { ItemCategoryService } from './item-category.service';
import { ItemSourceService } from './item-source.service';
import { ItemFactoryService } from './item-factory.service';
import { JobService } from './job.service';
import { LoadingService } from './loading.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SaveService } from './save.service';
import { ValuesService } from './values.service';
import { RouterModule } from '@angular/router';
import { StatService } from './stat.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  exports: [
    ChooseClassComponent,
    CategoryLinksComponent,
    ItemIconComponent,
    ItemLinkComponent,
    JobIconComponent,
    LoadingComponent,
    StatsComponent,
    RegionComponent
  ],
  declarations: [
    ChooseClassComponent,
    CategoryLinksComponent,
    ItemIconComponent,
    ItemLinkComponent,
    JobIconComponent,
    LoadingComponent,
    StatsComponent,
    RegionComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        TranslationService,
        RegionService,
        DntService,
        DntInitService,
        DntResetService,
        ExportLinkService,
        ItemCategoryService,
        ItemSourceService,
        ItemFactoryService,
        JobService,
        LoadingService,
        SaveService,
        ValuesService,
        LoadingService,
        StatService
      ],
    };
  }
}
