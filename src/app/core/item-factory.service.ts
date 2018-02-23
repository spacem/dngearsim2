import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { DntService } from './dnt.service';
import { ValuesService, Stat } from './values.service';
import { ItemSourceService, ItemSource } from './item-source.service';

export interface Item {
  row?: any;
  potential?: any;
  id?: number;
  itemSource?: string;
  levelLimit?: number;
  needJobClass?: number;
  typeId?: any;
  exchangeType?: any;
  rank?: any;
  pid?: any,
  name?: string;
  stats?: any[];
  potentialRatio?: any;
  typeName?: any;
  sparkId?: any;
  gemSlot?: any;
  setId?: any;
  enchantmentNum?: number;
  enchantmentId?: any;
  offensiveGemSlots?: number;
  increasingGemSlots?: number;
  dragonjeweltype?: any;
  icon?: any;
  fileName?: string;
  description?: string;

  setStats?: Stat[];
  fullStats?: Stat[];
  enchantmentStats?: Stat[];
  sparkStats?: Stat[];
}

@Injectable()
export class ItemFactoryService {

  constructor(
    private translationService: TranslationService,
    private dntService: DntService,
    private valuesService: ValuesService,
    private itemSourceService: ItemSourceService
  ) { }


  createItem(itemType: any, row: any, p: any): Item {
    
    // data and potential are used to initialise name and stats
    // this is only done when needed
    // they are then removed from the object
    return {
      row: row,
      potential : p,
      id: this.dntService.getValue(itemType.mainDnt, row, 'id'),
      itemSource : itemType.name,
      levelLimit : Number(this.dntService.getValue(itemType.mainDnt, row, 'LevelLimit')),
      needJobClass : Number(this.dntService.getValue(itemType.mainDnt, row, 'NeedJobClass')),
      typeId : this.dntService.getValue(itemType.mainDnt, row, 'Type'),
      exchangeType: this.dntService.getValue(itemType.mainDnt, row, 'ExchangeType'),
      rank : this.valuesService.rankNames[this.dntService.getValue(itemType.mainDnt, row, 'Rank')],
      pid: null,
      name : null,
      stats : null,
      potentialRatio : null,
      typeName : null,
      sparkId: null,
    };
  }

  private isDataLoaded(itemType: any) {
    
    if(!this.dntService.isLoaded(itemType.mainDnt)) {
      return false;
    }
    
    if(!this.translationService.isLoaded()) {
      return false;
    }
    
    if('potentialDnt' in itemType && !this.dntService.isLoaded(itemType.potentialDnt)) {
      return false;
    }
    
    if('potentialDntEx' in itemType && !this.dntService.isLoaded(itemType.potentialDntEx)) {
      return false;
    }

    return true;

  }
  
  loadItems(itemType: ItemSource) {

    if(!this.isDataLoaded(itemType)) {
      console.log('data not loaded for ', itemType);
      return null;
    }
    
    var start = new Date().getTime();
    
    itemType.items = [];
    var numRows = this.dntService.getNumRows(itemType.mainDnt);
    for(var r=0;r<numRows;++r) {
      var dType = this.dntService.getValue(itemType.mainDnt, r, 'Type');

      var state1Max = this.dntService.getValue(itemType.mainDnt, r, 'State1_Max');
      var dStateValue1 = this.dntService.getValue(itemType.mainDnt, r, 'StateValue1');
      var dTypeParam1 = this.dntService.getValue(itemType.mainDnt, r, 'TypeParam1');
        
      // skip items with no data
      if(state1Max > 0 || dStateValue1 > 0 || dTypeParam1 > 0 || dType == 35) {        
        var potentials = [];
        if(dTypeParam1 > 0 && 'potentialDnt' in itemType) {
          potentials = this.dntService.find(itemType.potentialDnt, 'PotentialID', dTypeParam1);
          
          if(!potentials.length && 'potentialDntEx' in itemType) {
            potentials = this.dntService.find(itemType.potentialDntEx, 'PotentialID', dTypeParam1);
          }
        }
        
        var numPotentials = potentials.length;
        if(!numPotentials) {
          potentials = [null];
          numPotentials = 1;
        }

        for(var p=0;p<numPotentials;++p) {
          var found = false;          
          if(!found) {
            itemType.items.push(this.createItem(itemType, r, potentials[p]));
          }
        }
      }
    }
            
    var end = new Date().getTime();
    var time = end - start;
    console.log('item init time: ' + (time/1000) + 's for ' + itemType.name);
  }
  
  initItem(item: any) {
    
    if(item.row >= 0) {
      var d;
      if(item.itemSource && item.itemSource in this.itemSourceService.sources) {
        d = this.dntService.getRow(this.itemSourceService.sources[item.itemSource].mainDnt, item.row);
      }
      else if(item.fileName) {
        d = this.dntService.getRow(item.fileName + '.lzjson', item.row);
      }
      delete item.row;

      var p = item.potential;
  
      if(item.name == null) {
        item.name = this.translationService.translate(d.NameID, d.NameIDParam);
        if(d.TierName) {
          item.name += ' (' + this.translationService.translate(d.TierName) + ')';
        }
      }
      
      if(!item.sparkTypeId && d.TypeParam2 > 0) {
        item.sparkTypeId = d.TypeParam2;
      }
      
      if(item.stats == null) {
        var stats = this.valuesService.getStats(d);
        if(p) {
          var potentialStats = this.valuesService.getStats(p);
          stats = this.valuesService.mergeStats(stats, potentialStats);
        }
        
        item.stats = stats;
      }
      
      if(d.SkillID && !item.skillId) {
        item.skillId = d.SkillID;
      }
      
      if(item.iconIndex == null) {
        item.icon = d.IconImageIndex;
        if(!item.icon && item.itemSource == 'title') {
          item.icon = 12417;
        }
      }
      
      if(d.dragonjeweltype >= 0) {
        item.dragonjeweltype = d.dragonjeweltype;
      }
      
      if(d.EnchantID && !item.enchantmentId) {
        item.enchantmentId = d.EnchantID;
      }
      
      if(d.EnchantID && !item.enchantmentId) {
        item.enchantmentId = d.EnchantID;
      }
      else if(d.Type == 35) {
        item.itemSource = 'xtras';
        var itemType = this.itemSourceService.sources[item.itemSource];
        if(itemType) {
          // item.fileName = itemType.mainDnt;
          var petData = this.dntService.find(itemType.petDnt, 'id', d.id);
          if(petData && petData.length) {
            item.enchantmentId = petData[0].PetLevelTypeID;
          }
        }
      }
      
      if(p) {
        item.pid = p.id;
      }
      
      delete item.potential;
    }
  }
  
  getItemData(item: any) {
    var itemType = this.itemSourceService.sources[item.itemSource];
    
    if(item.fileName && this.dntService.isLoaded(item.fileName + '.lzjson')) {
      var result = this.getItemDataFromFile(item.fileName + '.lzjson', item);
      if(result) {
        return result;
      }
    }
    
    if(item.fileName && this.dntService.isLoaded(item.fileName + '.optimised.json')) {
      var result = this.getItemDataFromFile(item.fileName + '.optimised.json', item);
      if(result) {
        return result;
      }
    }
    
    if(itemType && this.dntService.isLoaded(itemType.mainDnt)) {
      var result = this.getItemDataFromFile(itemType.mainDnt, item);
      if(result) {
        return result;
      }
    }
    
    return [];
  }
  
  private getItemDataFromFile(fileName: any, item: any) {
    if(fileName) {
      var itemData = this.dntService.find(fileName, 'id', item.id);
      if(itemData && itemData.length > 0) {
        return itemData[0];
      }
    }
    
    return null;
  }
  
  createBasicItem(d: any): Item {
    if(!d) {
      return {};
    }
    return {
      id: d.id,
      name: this.translationService.translate(d.NameID, d.NameIDParam),
      rank: this.valuesService.rankNames[d.Rank],
      icon: d.IconImageIndex,
      levelLimit : d.LevelLimit,
      fileName: d.fileName,
      typeId: d.Type
    };
  }

}
