import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildActionsComponent } from './build-actions/build-actions.component';
import { BuildExportActionComponent } from './build-export-action/build-export-action.component';
import { BuildImportComponent } from './build-import/build-import.component';
import { BuildItemListComponent } from './build-item-list/build-item-list.component';
import { BuildItemComponent } from './build-item/build-item.component';
import { BuildListComponent } from './build-list/build-list.component';
import { BuildStatsComponent } from './build-stats/build-stats.component';
import { BuildSummaryComponent } from './build-summary/build-summary.component';
import { BuildTalismansComponent } from './build-talismans/build-talismans.component';
import { BuildComponent } from './build/build.component';
import { DeleteBuildComponent } from './delete-build/delete-build.component';
import { EditBuildComponent } from './edit-build/edit-build.component';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { ReloadBuildComponent } from './reload-build/reload-build.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ExportComponent } from './export/export.component';
import { CoreModule } from '../core/core.module';
import { BuildsRoutingModule } from './builds-routing.module';
import { QuickAddHelperService } from './quick-add-helper.service';
import { QuickAddService } from './quick-add.service';
import { QuickAddStepsService } from './quick-add-steps.service';
import { ItemModule } from '../item/item.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    BuildsRoutingModule,
    CoreModule,
    ItemModule,
    TranslateModule.forChild()
  ],
  declarations: [
    BuildActionsComponent,
    BuildExportActionComponent,
    BuildImportComponent,
    BuildItemListComponent,
    BuildItemComponent,
    BuildListComponent,
    BuildStatsComponent,
    BuildSummaryComponent,
    BuildTalismansComponent,
    BuildComponent,
    DeleteBuildComponent,
    EditBuildComponent,
    QuickAddComponent,
    ReloadBuildComponent,
    ViewGroupComponent,
    ExportComponent
  ],
  providers: [
    QuickAddHelperService,
    QuickAddService,
    QuickAddStepsService
  ],
  exports: [
    BuildItemComponent
  ]
})
export class BuildsModule { }
