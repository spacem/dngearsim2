import { Injectable } from '@angular/core';
import { ItemFactoryService } from './item-factory.service';
import { DntService } from './dnt.service';
import { ItemSourceService } from './item-source.service';

@Injectable()
export class ItemCategoryService {

  constructor(
    private itemFactoryService: ItemFactoryService,
    private dntService: DntService,
    private itemSourceService: ItemSourceService
  ) { }

  categories: any[] = [
    { path: 'everything', name: 'everything', searchType: 'everything', hideInBuild: true },
    { path: 'titles', name: 'titles', sourceType: 'titles', hideRank: true, hideJob: true, hideLevel: true, numItemText: '1', maxCat: 1 },
    { path: 'weapons', name: 'weapons', sourceType: 'equipment', numItemText: '2', maxExchange: 1, maxCat: 2, limitExchange: [1, 2] },
    { path: 'armour', name: 'armour', sourceType: 'equipment', numItemText: '5', maxExchange: 1, maxCat: 5, limitExchange: [3, 4, 5, 6, 7] },
    { path: 'accessories', name: 'accessories', sourceType: 'equipment', hideJob: true, maxCat: 4, maxExchange: 2, limitExchange: [8, 9, 10], tId: 7604 },
    { path: 'techs', name: 'techs', sourceType: 'techs', maxCat: 4, maxExchange: 2, limitExchange: [8, 9, 10], hideJob: true },
    { path: 'offensive-gems', name: 'offensive gems', sourceType: 'gems', hideJob: true, maxCat: 4, maxExchange: 4, limitExchange: [54], limitGemType: 1 },
    { path: 'increasing-gems', name: 'increasing gems', sourceType: 'gems', hideJob: true, maxCat: 14, maxExchange: 14, limitExchange: [54], limitGemType: 2 },
    { path: 'enhancement-plates', name: 'enhancement plates', sourceType: 'plates', hideJob: true, numItemText: '8+3', maxCat: 11, maxExchange: 15, limitExchange: [33], limitRank: [0, 1, 2, 3] },
    { path: 'expedition-plates', name: 'expedition plates', sourceType: 'plates', hideRank: true, hideJob: true, numItemText: '4', maxCat: 4, maxExchange: 15, limitExchange: [33], limitRank: [4, 5] },
    { path: 'talisman', name: 'talisman', sourceType: 'talisman', hideJob: true, numItemText: '8+4', maxCat: 12, maxExchange: 12, limitExchange: [52, 53], tId: 1000054149 },
    { path: 'costume', name: 'costume', sourceType: 'cash', numItemText: '7', maxCat: 7, maxExchange: 1, hideLevel: true, limitExchange: [16, 17, 18, 19, 20, 21, 22], tId: 7607 },
    { path: 'imprint', name: 'imprint', sourceType: 'imprint', numItemText: '7', maxCat: 7, hideLevel: true, hideJob: true, tId: 1000108314 },
    { path: 'cash', name: 'cash', sourceType: 'cash', numItemText: '8', maxCat: 8, maxExchange: 2, hideJob: true, hideLevel: true, limitExchange: [23, 24, 25, 26, 27, 28, 29], tId: 7608 },
    { path: 'extras', name: 'extras', sourceType: 'xtras', limitExchange: [47], hideJob: true, hideLevel: true, tId: 4504 },
    { path: 'skills', name: 'skills', searchType: 'skills' },
    { path: 'custom', name: 'custom', searchType: 'custom', hideInSearch: true }
  ];

  byName(name: string) {
    return this.categories.find(c => c.name === name);
  }

  byPath(name: string) {
    var retVal = null;
    this.categories.forEach(category => {
      if (category.path == name) {
        retVal = category;
      }
    });

    return retVal;
  }

  getItems(name: string) {
    var cat = this.byName(name);
    if (cat && 'sourceType' in cat) {
      var retVal = [];
      const sources = Object.values(this.itemSourceService.sources).filter(s => s.type === cat.sourceType);
      for (let source of sources) {
        if (!source.items && !source.loading) {
          this.itemFactoryService.loadItems(source);
        }

        if (source.items) {
          retVal = retVal.concat(source.items);
        }
        else {
          retVal = null; // if any are null just return null
        }
      }

      var catItems = [];
      if (retVal) {
        retVal.forEach(item => {
          if (item.typeName == name) {
            catItems.push(item);
          }
          else if (this.isItemForCat(cat, item)) {
            item.typeName = name;
            catItems.push(item);
          }
        });
      }

      return catItems;
    }
    else {
      return null;
    }
  }

  isItemForCat(cat: any, item: any) {

    if (!(item.itemSource in this.itemSourceService.sources)) {
      return false;
    }

    if (this.itemSourceService.sources[item.itemSource].type != cat.sourceType) {
      return false;
    }

    if (item.itemType == cat.name) {
      return true;
    }

    var anyMatch;
    if (cat.limitExchange) {
      anyMatch = false;
      for (var i = 0; i < cat.limitExchange.length; ++i) {
        if (cat.limitExchange[i] == item.exchangeType || (item.rawData && cat.limitExchange[i] == item.rawData.ExchangeType)) {
          anyMatch = true;
        }
      }

      if (!anyMatch) {
        return false;
      }
    }

    if (cat.limitRank) {
      anyMatch = false;
      for (var i = 0; i < cat.limitRank.length; ++i) {
        if ((item.rank && cat.limitRank[i] == item.rank.id) || (item.rawData && cat.limitRank[i] == item.rawData.Rank)) {
          anyMatch = true;
        }
      }

      if (!anyMatch) {
        return false;
      }
    }

    if (cat.limitGemType) {
      var gemTypes = this.dntService.find(this.itemSourceService.sources.gem.gemDnt, 'id', item.id);
      if (gemTypes.length > 0) {

        if (gemTypes[0].Type != cat.limitGemType) {
          return false;
        }
      }
    }

    return true;
  }

  async init(name: string) {
    var cat = this.byName(name);
    if (cat && 'sourceType' in cat) {
      var sources = Object.values(this.itemSourceService.sources).filter(source => {
        return source.type == cat.sourceType;
      });

      var numComplete = 0;
      await Promise.all(sources.map(source => source.init()));
    }
  }

  setItemCategory(item: any) {
    this.categories.forEach(cat => {
      if (this.isItemForCat(cat, item)) {
        item.typeName = cat.name;
      }
    });
  }

  getItemsByCategory(items: any[]) {
    var itemMap = {};
    if (items) {
      var types = {};
      items.forEach(item => {
        if (item) {
          if (!(item.typeName in types)) {
            types[item.typeName] = [];
          }
          types[item.typeName].push(item);
        }
      });

      this.categories.forEach(category => {
        if (category.name in types) {

          var sorted = types[category.name].sort(function (item1, item2) {
            if (category.name == 'talisman') {

              var enh1 = item1.enchantmentNum;
              if (!enh1) enh1 = 0;
              var enh2 = item2.enchantmentNum;
              if (!enh2) enh2 = 0;

              if (enh1 != enh2) {
                return enh2 - enh1;
              }
            }
            else if (item1.itemSource == 'gem' || item1.itemSource == 'plate') {
              if (item1.gemSlot || item2.gemSlot) {
                if (!item1.gemSlot) {
                  return 1;
                }
                else if (!item2.gemSlot) {
                  return -1;
                }
                return item1.gemSlot - item2.gemSlot;
              }
              else if (item2.levelLimit != item1.levelLimit) {
                return item2.levelLimit - item1.levelLimit;
              }
            }
            else if ('exchangeType' in item1 && 'exchangeType' in item2) {
              return item1.exchangeType - item2.exchangeType;
            }

            return item1.name.localeCompare(item2.name);
          });
          itemMap[category.name] = sorted;
        }
        else {
          itemMap[category.name] = [];
        }
      });

    }
    return itemMap;
  }
}
