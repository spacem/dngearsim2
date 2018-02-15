import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildSearchComponent } from './build-search/build-search.component';
import { ProfileComponent } from './profile/profile.component';
import { PublishComponent } from './publish/publish.component';
import { PublishedComponent } from './published/published.component';
import { CoreModule } from '../core/core.module';
import { OnlineRoutingModule } from './online-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OnlineRoutingModule,
    CoreModule
  ],
  declarations: [BuildSearchComponent, ProfileComponent, PublishComponent, PublishedComponent]
})
export class OnlineModule { }
