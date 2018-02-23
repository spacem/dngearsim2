import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomItemsComponent } from './custom-items/custom-items.component';
import { EverythingSearchComponent } from './everything-search/everything-search.component';
import { SearchComponent } from './search/search.component';
import { SkillSearchComponent } from './skill-search/skill-search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms'; 
import { TranslateModule } from '@ngx-translate/core';
import { BuildsModule } from '../builds/builds.module';
import { ItemModule } from '../item/item.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    BuildsModule,
    ItemModule,
    FormsModule,
    TranslateModule.forChild(),
    InfiniteScrollModule
  ],
  declarations: [CustomItemsComponent, EverythingSearchComponent, SearchComponent, SkillSearchComponent]
})
export class SearchModule { }
