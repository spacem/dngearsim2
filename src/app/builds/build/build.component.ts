import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StatService } from '../../core/stat.service';
import { ItemCategoryService } from '../../core/item-category.service';
import { SaveService } from '../../core/save.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  xsView: any;
  moveItem: any;
  @Input() buildName: string;
  @Input() build: any;
  @Output() buildChange = new EventEmitter();

  stats = [];
  category: any;

  constructor(
    private statService: StatService,
    private itemCategoryService: ItemCategoryService,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.stats = this.statService.getBuildStats(this.build);
    var selectedCategory = localStorage.getItem('selectedItemCategory');
    this.category = this.itemCategoryService.byName(selectedCategory);
    if(!this.category || this.category.hideInBuild) {
      selectedCategory = 'titles';
      this.category = this.itemCategoryService.byName('titles');
    }
  }
  
  
  getCategoryItems() {
    var itemsByCat = this.itemCategoryService.getItemsByCategory(this.build.items);
    if(this.category.name in itemsByCat) {
      return itemsByCat[this.category.name];
    }
    else {
      return [];
    }
  }

  changeCategory() {
    this.xsView = null;
    this.moveItem = null;
  }

  getCategories() {
    return this.itemCategoryService.categories;
  }
    
  setSelectedCategory(value) {
    this.category = this.itemCategoryService.byName(value);
    localStorage.setItem('selectedItemCategory', value);
  }
  
  getSaveDate(group) {
    if(this.build.lastUpdate > 0) {
      var lastUpdate = new Date(this.build.lastUpdate);
      return lastUpdate.toLocaleDateString();
    }
  }
  
  getSaveTime(group) {
    if(this.build.lastUpdate > 0) {
      var lastUpdate = new Date(this.build.lastUpdate);
      return lastUpdate.toLocaleTimeString();
    }
  }
  
  allowMoreItems() {
    return !this.category.maxCat || this.getCategoryItems().length < this.category.maxCat;
  }
  
  getItemCount() {
    var itemCountText = '';
    var allItems = this.build.items;
    
    if(this.category.name == 'offensive gems') {
      var numOffensiveSlots = 0;
      var numOffensiveGems = 0;
      allItems.forEach(item => {
        if(item.typeName == this.category.name) {
          numOffensiveGems++;
        }
        else if(item.offensiveGemSlots) {
          numOffensiveSlots += item.offensiveGemSlots;
        }
      });
      
      itemCountText = numOffensiveGems + ' / ' + numOffensiveSlots;
    }
    else if(this.category.name == 'increasing gems') {
      
      var totalIncreasingGems = 0;
      var numIncreasingSlots = 0;
      var numIncreasingGems = {};
      allItems.forEach(item => {
        if(item.typeName == this.category.name) {
          var gemType = item.sparkTypeId;
          if(!gemType) {
            gemType = 0;
          }
          
          if(!(gemType in numIncreasingGems)) {
            numIncreasingGems[gemType] = 0;
          }
          numIncreasingGems[gemType]++;
          totalIncreasingGems++;
        }
        else if(item.increasingGemSlots) {
          numIncreasingSlots += item.increasingGemSlots;
        }
      });
      
      itemCountText = ''
      Object.keys(numIncreasingGems).forEach(number => {
        if(itemCountText.length > 0) {
          itemCountText += '+';
        }
        itemCountText += number;
      });
      
      itemCountText = totalIncreasingGems + ' (' + itemCountText + ') / ' + numIncreasingSlots;
    }
    else {
      var numItems = 0;
      allItems.forEach(item => {
        if(item && item.typeName == this.category.name) {
          numItems++;
        }
      });
      
      itemCountText = numItems.toString();
      var cat = this.itemCategoryService.byName(this.category.name);
      if(cat && 'numItemText' in cat) {
        itemCountText += ' / ' + cat.numItemText;
      }
    }
    
    return itemCountText;
  }
  
  newCustom() {
    var newCustom = {id: 0, typeName:'custom', name: 'new custom item', stats: []};
    this.build.items = this.build.items.concat(newCustom);
    this.saveService.updatedSavedItems(this.buildName, this.build.items);
    this.handleChange();
  }
  
  handleChange() {
    this.stats = this.statService.getBuildStats(this.build);
  }  
}
