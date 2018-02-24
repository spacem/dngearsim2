import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemCategoryService } from '../item-category.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-links',
  templateUrl: './category-links.component.html',
  styleUrls: ['./category-links.component.scss']
})
export class CategoryLinksComponent implements OnInit {

  @Input() collapse: boolean;
  @Input() category: any;
  @Output() changeCategory = new EventEmitter();

  buildScreen: boolean;
  categories = this.itemCategoryService.categories;
  collapsed = true;
  action: any;

  constructor(
    private itemCategoryService: ItemCategoryService,
    private translateService: TranslateService,
    private translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  shouldShow(category) {
    if(this.collapse && this.collapsed && category != this.category) {
      return false;
    }

    if(this.buildScreen) {
      return !category.hideInBuild;
    }
    else {
      return !category.hideInSearch;
    }
  }

  isLoading() {
    return !this.translationService.loaded;
  }

  setCategory(category) {
    
    if(this.collapse) {
      this.collapsed = !this.collapsed;
      window.scrollTo(0, 0);
    }
    
    if(this.category != category) {
      localStorage.setItem('selectedItemCategory', category.name);
      this.router.navigate([category.name], { relativeTo: this.route.parent });
    }
  }

  getName(action) {
    if(action.tId) {
      return this.translationService.translate(action.tId).toLowerCase();
    }
    else {
      return this.translateService.instant(action.name);
    }
  }

}
