import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { JobService } from '../core/job.service';
import { ItemFactoryService } from '../core/item-factory.service';
import { ItemCategoryService } from '../core/item-category.service';

@Injectable()
export class QuickAddHelperService {

  constructor(
    private jobService: JobService,
    private itemFactoryService: ItemFactoryService,
    private itemCategoryService: ItemCategoryService
  ) { }


  getItem(datas: any[]) {
    var item = null;
    for (var d = 0; d < datas.length; ++d) {
      if (datas[d].def.isItemStep) {
        item = datas[d].value;
      }
    }

    for (var d = 0; d < datas.length; ++d) {
      if (datas[d].def.alterItem) {
        datas[d].def.alterItem(datas[d].value.id, item);
      }
    }

    return item;
  }

  findData(category: any, build: any, datas: any[], maxItems: number) {
    if (!maxItems) {
      maxItems = 9999;
    }

    var allItems = this.itemCategoryService.getItems(category.name);
    var retVal = [];
    var numItems = allItems.length;

    var sortFunc = null;
    var sortId = null;

    for (var i = 0; i < numItems; ++i) {

      var item = allItems[i];

      if (!category.hideJob && build.job.id > 0 && item.needJobClass > 0 && !this.jobService.isClassJob(build.job.d, item.needJobClass)) {
        continue;
      }
      this.itemFactoryService.initItem(item);

      var addItem = true;
      for (var d = 0; d < datas.length; ++d) {
        if (!datas[d].def.matchesItem || datas[d].def.matchesItem(datas[d].value.id, item)) {
          if ('sortFunc' in datas[d].def) {
            sortFunc = datas[d].def.sortFunc;
            sortId = datas[d].value.id;
          }
        }
        else {
          addItem = false;
          break;
        }
      }

      if (addItem) {
        retVal.push(item);
      }

      if (retVal.length >= maxItems) {
        break;
      }
    }

    retVal = this.filterDuplicates(retVal);

    retVal = retVal.sort(function (item1, item2) {
      if (sortFunc) {
        return sortFunc(sortId, item1, item2);
      }
      else {
        return item1.name.localeCompare(item2.name);
      }
    });

    return retVal;
  }

  filterDuplicates(items: any[]) {
    var retVal = [];
    for (var i = 0; i < items.length; ++i) {
      var found = false;
      for (var j = 0; j < i; ++j) {
        if (this.areSameItem(items[i], items[j])) {
          found = true;
          break;
        }
      }

      if (!found) {
        retVal.push(items[i]);
      }
    }

    return retVal;
  }

  areSameItem(item1: any, item2: any) {
    if (item1.name != item2.name || item1.stats.length != item2.stats.length || item1.rank != item2.rank || item1.levelLimit != item1.levelLimit) {
      return false;
    }

    return _.isEqual(item1.stats, item2.stats);
  }

}
