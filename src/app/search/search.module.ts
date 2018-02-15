import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomItemsComponent } from './custom-items/custom-items.component';
import { EverythingSearchComponent } from './everything-search/everything-search.component';
import { SearchComponent } from './search/search.component';
import { SkillSearchComponent } from './skill-search/skill-search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule
  ],
  declarations: [CustomItemsComponent, EverythingSearchComponent, SearchComponent, SkillSearchComponent]
})
export class SearchModule { }
