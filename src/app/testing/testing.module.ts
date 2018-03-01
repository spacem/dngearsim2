import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  StubLoadingComponent,
  StubItemEditComponent,
  StubItemIconComponent,
  StubStatsComponent,
  StubItemLinkComponent, 
  StubBuildSummaryComponent,
  StubBuildComponent,
  StubRegionComponent,
  StubJobIconComponent,
  StubCategoryLinksComponent,
  StubBuildItemComponent,
  StubBuildAssignmentComponent,
  StubSkillSearchComponent,
  StubCustomItemsComponent,
  StubEverythingSearchComponent
} from './testing.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslationService } from '../core/translation.service';
import {
  TranslationServiceStub,
  DntServiceStub,
  RegionServiceStub,
  ExportLinkServiceStub,
  ItemSourceServiceStub,
  TranslateServiceStub,
  SaveServiceStub,
  ItemCategoryServiceStub,
  JobServiceStub,
  ItemFactoryServiceStub,
  QuickAddStepsServiceStub,
  QuickAddHelperServiceStub,
  LoadingServiceStub,
  HttpClientStub
} from './testing.service';
import { DntService } from '../core/dnt.service';
import { RegionService } from '../core/region.service';
import { ExportLinkService } from '../core/export-link.service';
import { ItemSourceService } from '../core/item-source.service';
import { ValuesService } from '../core/values.service';
import { SaveService } from '../core/save.service';
import { StatService } from '../core/stat.service';
import { ItemCategoryService } from '../core/item-category.service';
import { JobService } from '../core/job.service';
import { ItemFactoryService } from '../core/item-factory.service';
import { QuickAddStepsService } from '../builds/quick-add-steps.service';
import { QuickAddHelperService } from '../builds/quick-add-helper.service';
import { LoadingService } from '../core/loading.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    RouterTestingModule,
    FormsModule
  ],
  declarations: [
    StubLoadingComponent,
    StubItemLinkComponent,
    StubStatsComponent,
    StubItemEditComponent,
    StubItemIconComponent,
    StubBuildSummaryComponent,
    StubBuildComponent,
    StubRegionComponent,
    StubJobIconComponent,
    StubCategoryLinksComponent,
    StubBuildItemComponent,
    StubBuildAssignmentComponent,
    StubSkillSearchComponent,
    StubCustomItemsComponent,
    StubEverythingSearchComponent
  ],
  providers: [
    { provide: TranslationService, useClass: TranslationServiceStub },
    { provide: DntService, useClass: DntServiceStub },
    { provide: RegionService, useClass: RegionServiceStub },
    { provide: ExportLinkService, useClass: ExportLinkServiceStub },
    { provide: ItemSourceService, useClass: ItemSourceServiceStub },
    { provide: TranslateService, useClass: TranslateServiceStub },
    ValuesService,
    { provide: SaveService, useClass: SaveServiceStub },
    StatService,
    { provide: ItemCategoryService, useClass: ItemCategoryServiceStub },
    { provide: JobService, useClass: JobServiceStub },
    { provide: ItemFactoryService, useClass: ItemFactoryServiceStub },
    { provide: QuickAddStepsService, useClass: QuickAddStepsServiceStub },
    { provide: QuickAddHelperService, useClass: QuickAddHelperServiceStub },
    { provide: LoadingService, useClass: LoadingServiceStub },
    { provide: HttpClient, useClass: HttpClientStub },
  ],
  exports: [
    TranslateModule,
    FormsModule,
    RouterTestingModule,
    StubLoadingComponent,
    StubItemLinkComponent,
    StubStatsComponent,
    StubItemEditComponent,
    StubItemIconComponent,
    StubBuildSummaryComponent,
    StubBuildComponent,
    StubRegionComponent,
    StubJobIconComponent,
    StubCategoryLinksComponent,
    StubBuildItemComponent,
    StubBuildAssignmentComponent,
    StubSkillSearchComponent,
    StubCustomItemsComponent,
    StubEverythingSearchComponent
  ]
})
export class TestingModule { }
