import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { ProfileComponent } from './profile/profile.component';
import { PublishedComponent } from './published/published.component';
import { BuildSearchComponent } from './build-search/build-search.component';

const routes: Routes = [
  { path: 'publish', component: PublishComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'published', component: PublishedComponent },
  { path: 'build-search', component: BuildSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRoutingModule { }
