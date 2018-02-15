import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { EditBuildComponent } from './edit-build/edit-build.component';
import { DeleteBuildComponent } from './delete-build/delete-build.component';
import { BuildExportActionComponent } from './build-export-action/build-export-action.component';
import { BuildTalismansComponent } from './build-talismans/build-talismans.component';
import { BuildImportComponent } from './build-import/build-import.component';

const routes: Routes = [
  { path: '', component: BuildComponent },
  { path: 'edit-build', component: EditBuildComponent },
  { path: 'new-build', component: EditBuildComponent },
  { path: 'delete-build', component: DeleteBuildComponent },
  { path: 'export', component: BuildExportActionComponent },
  { path: 'talismans', component: BuildTalismansComponent },
  { path: 'import', component: BuildImportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildsRoutingModule { }
