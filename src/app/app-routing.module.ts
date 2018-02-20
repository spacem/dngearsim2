import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },

  { path: 'builds', loadChildren: './builds/builds.module#BuildsModule' },
  { path: 'item', loadChildren: './item/item.module#ItemModule' },
  { path: 'online', loadChildren: './online/online.module#OnlineModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
