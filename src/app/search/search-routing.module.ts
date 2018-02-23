import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EverythingSearchComponent } from './everything-search/everything-search.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'everything' },
  { path: ':category', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
