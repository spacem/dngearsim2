import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemSourceService } from '../../core/item-source.service';
import { ExportLinkService } from '../../core/export-link.service';
import { TranslationService } from '../../core/translation.service';
import { DntService } from '../../core/dnt.service';
import { StatService } from '../../core/stat.service';
import { JobService } from '../../core/job.service';
import { ItemFactoryService } from '../../core/item-factory.service';
import { SaveService } from '../../core/save.service';
import { ValuesService } from '../../core/values.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  hasContents: boolean;
  isPlate: boolean;
  isInSet: boolean;
  canTune: boolean;
  canTransfer: boolean;
  canExtract: boolean;
  canUse: boolean;
  item: any;
  jobName: string;
  itemType: any;
  detail: any;
  preInitItem: any;
  builds: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemSourceService: ItemSourceService,
    private exportLinkService: ExportLinkService,
    private translationService: TranslationService,
    private dntService: DntService,
    private statService: StatService,
    private jobService: JobService,
    private itemFactoryService: ItemFactoryService,
    private saveService: SaveService,
    private valuesService: ValuesService
  ) { }

  ngOnInit() {
    // this.setItem(this.route.snapshot.paramMap.get('encodedItem'));
    this.route.paramMap.subscribe(p => {
      this.setItem(p.get('encodedItem'));
    });
  }

  async setItem(encodedItem: string) {
    this.item = null;
    const preInitItem = this.exportLinkService.decodeItem(encodedItem);
    if ('itemSource' in preInitItem) {
      this.itemType = this.itemSourceService.sources[preInitItem.itemSource];
    }

    preInitItem.setStats = null;
    preInitItem.setId = null;
    this.init(preInitItem);
  }

  async init(preInitItem) {
    this.getBuilds();
  
    const files = this.exportLinkService.getDntFileList(preInitItem);
    console.log('loading files', files);
    for (const fileName of files) {
      if (!this.dntService.isLoaded(fileName)) {
        await this.dntService.init(fileName);
      }
    }
  
    if (!this.translationService.isLoaded()) {
      await this.translationService.init();
    }
  
    if (!this.jobService.isLoaded()) {
      await this.jobService.init();
    }
  
    this.item = this.exportLinkService.reloadItem(preInitItem);
    if (this.item == null) {
      return;
    }

    this.setFullStats();
    if (this.item.itemSource != 'custom') {
      if (this.item.typeName == 'skills') {
        if (!this.item.pve || this.item.pve != 'pvp') {
          this.item.pve = 'pve';
        }
        else {
          this.item.pve = 'pvp';
        }
      }
      else {
        if (this.item.needJobClass > 0) {
          this.getJobName();
        }
      }

      this.setFileName();
    }

    this.setupTabs();
  }

  getDescription() {
  if (this.item.description) {
    return this.item.description;
  }
  else if (this.itemType &&
    this.itemType.name == 'title' &&
    this.translationService.isLoaded() &&
    this.dntService.isLoaded(this.itemType.mainDnt)) {

    var itemData = this.dntService.find(this.itemType.mainDnt, 'id', this.item.id);
    if (itemData && itemData.length > 0 && itemData[0].DescriptionID > 0) {
      return this.translationService.translate(itemData[0].DescriptionID, itemData[0].DescriptionIDParam);
    }
  }
  else if (this.item.fileName &&
    this.dntService.isLoaded(this.item.fileName + '.lzjson')) {

    var itemData = this.dntService.find(this.item.fileName + '.lzjson', 'id', this.item.id);
    if (itemData && itemData.length > 0 && itemData[0].DescriptionID > 0) {
      return this.translationService.translate(itemData[0].DescriptionID, itemData[0].DescriptionIDParam);
    }
  }
  return '';
}

getExchangeType() {
  // console.log('getting exchange');
  var exchangeDnt = 'exchange.lzjson';
  if (this.translationService.isLoaded() &&
    this.dntService.isLoaded(exchangeDnt) &&
    this.item.exchangeType > 0) {

    // console.log('finding exchange ' + this.item.exchangeType);

    var exchange = this.dntService.find(exchangeDnt, 'ExchangeType', this.item.exchangeType);
    // console.log('got ' + exchange.length);
    if (exchange && exchange.length > 0 && exchange[0].NameID > 0) {
      // console.log('exchange name: ' + exchange[0].NameID);
      return this.translationService.translate(exchange[0].NameID).toLowerCase();
    }
  }
  return '';
}

setDetail(detail) {
  this.detail = detail;
}

getNumInSet() {

  var buildName = this.getBuildName();
  if (buildName && this.item && this.item.setId) {
    return this.statService.getNumItemsForSet(this.builds[buildName].items, this.item.setId);
  }

  return 0;
}

getBuildName() {
  var buildName = this.saveService.getCurrentBuild();
  if (this.builds) {
    if (!buildName || !(buildName in this.builds)) {
      var allBuildNames = Object.keys(this.builds);
      if (allBuildNames.length) {
        buildName = allBuildNames[0];
      }
    }
  }

  return buildName;
}

getSellingPrice() {
  var itemData = this.itemFactoryService.getItemData(this.item);
  var retVal = '';
  if ('SellAmount' in itemData && itemData.SellAmount > 0) {

    var gold = Math.floor(itemData.SellAmount / 10000);
    if (gold) {
      retVal += gold + 'gold ';
    }

    var silver = Math.floor(itemData.SellAmount / 100) % 100;
    if (silver) {
      retVal += silver + 'silver ';
    }

    var copper = itemData.SellAmount % 100;
    if (copper) {
      retVal += copper + 'copper ';
    }
  }
  return retVal;
}

getServerStorage() {
  var itemData = this.itemFactoryService.getItemData(this.item);
  var retVal = '';

  if (itemData && 'IsCash' in itemData && itemData.IsCash == 0) {
    if (itemData && 'AbleWStorage' in itemData) {
      if (itemData.AbleWStorage == 1) {
        retVal = 'can server storage';
      }
      else if (itemData.AbleWStorage == 0) {
        if (itemData && 'Reversion' in itemData && itemData.Reversion) {
          retVal = 'not transferable';
        }
      }
    }

    if (itemData && 'Reversion' in itemData) {
      if (retVal.length) {
        retVal += ', ';
      }

      if (itemData.Reversion == 0) {
        retVal += 'can trade';
      }
      else if (itemData.Reversion == 1) {
        retVal += 'not tradable ';
      }
    }
  }
  return retVal;
}

getMoreInfo() {
  var sealTimes = 0;
  var numStamps = 0;

  if (this.moreInfoLoaded()) {
    var itemData = this.itemFactoryService.getItemData(this.item);

    if (itemData && 'IsCash' in itemData && itemData.IsCash == 0) {
      if (itemData && 'SealID' in itemData && 'SealCount' in itemData) {
        sealTimes = itemData.SealCount;

        var sealData = this.dntService.find('sealcounttable.lzjson', 'Type2', itemData.SealID);
        if (sealData && sealData.length > 0 && sealData[0].Type1 == 0) {

          var colName = 'Count0';
          if (this.item.enchantmentNum) {
            colName = 'Count' + this.item.enchantmentNum;
          }

          if (colName in sealData[0]) {
            numStamps = sealData[0][colName];
          }
        }
      }
    }
    else if (itemData && 'IsCash' in itemData && 'CashTradeCount' in itemData && 'Reversion' in itemData && 'AbleWStorage' in itemData) {
      if (itemData.Reversion == 2) {
        if (itemData.CashTradeCount) {
          return 'can server storage, cash trade count: ' + itemData.CashTradeCount;
        }
        else {
          return 'can server storage, can use warranty';
        }
      }
      else if (itemData.AbleWStorage) {
        return 'can server storage';
      }
      else {
        return 'not tradable';
      }
    }
  }

  if (sealTimes && numStamps) {
    return 'can stamp ' + sealTimes + ' times using ' + numStamps + '  stamps';
  }
  else {
    return '';
  }
}

moreInfoLoaded() {
  return this.dntService.isLoaded(this.item.fileName + '.lzjson') &&
    this.dntService.isLoaded('sealcounttable.lzjson');
}

async loadMoreInfo() {
  await this.dntService.init(this.item.fileName + '.lzjson');
  await this.dntService.init('sealcounttable.lzjson');
}

handleChange() {
  // console.log('changes');
  if (this.item.itemSource != 'custom') {
    this.router.navigate(['..', this.exportLinkService.encodeItem(this.item)]);
  }
  else {
    this.setFullStats();
  }
  this.getBuilds();
}

getJobName() {
  var allJobs = this.jobService.getAllJobs();
  allJobs.forEach(job => {
    if (job.id == this.item.needJobClass) {
      this.jobName = job.name;
    }
  });
}

isLoaded() {
  var anyDntToLoad = false;
  this.exportLinkService.getDntFileList(this.preInitItem).forEach(fileName => {
    if (!this.dntService.isLoaded(fileName)) {
      anyDntToLoad = true;
    }
  });

  return !anyDntToLoad && this.translationService.isLoaded() && this.jobService.isLoaded();
}

setupTabs() {
  var itemData = this.itemFactoryService.getItemData(this.item);
  if (itemData.DisjointDrop1 > 0) {
    this.canExtract = true;
  }

  if ((itemData.Type == 0 || itemData.Type == 1) && this.item.enchantmentNum > 0) {
    this.canTransfer = true;
  }

  if (itemData.Type == 0 || itemData.Type == 1) {
    this.canTune = true;
  }

  if (this.item.setId) {
    this.isInSet = true;
  }

  if (this.item.typeId == 5) {
    this.isPlate = true;
  }

  if (this.item.typeId == 46 || this.item.typeId == 8 || this.item.typeId == 112 || this.item.typeId == 122 || this.item.typeId == 142 || this.item.typeId == 160) {
    this.hasContents = true;
    this.detail = 'contents';
  }
  else if (this.item.typeName != null) {
    this.canUse = true;
    this.detail = 'use';
  }
  else if (this.canExtract) {
    this.detail = 'extract';
  }
  else if (this.canTransfer) {
    this.detail = 'transfer';
  }
  else if (this.canTune) {
    this.detail = 'tuning';
  }
  else if (this.isPlate) {
    this.detail = 'plate';
  }
  else {
    this.detail = 'attainment';
  }
}

setFileName() {
  if (!this.item.fileName) {
    if (this.item.itemSource in this.itemSourceService.sources && this.itemSourceService.sources[this.item.itemSource].mainDnt) {
      this.item.fileName = this.itemSourceService.sources[this.item.itemSource].mainDnt.replace('.lzjson', '').replace('.json', '').replace('.optimised', '');
    }
  }
}

setFullStats() {
  // full stats are cleared when publishing builds
  this.item.fullStats = this.item.stats;

  if (this.item.enchantmentStats != null && this.item.enchantmentStats.length > 0) {
    this.item.fullStats = this.valuesService.mergeStats(this.item.enchantmentStats, this.item.fullStats);
  }

  if (this.item.sparkStats != null && this.item.sparkStats.length > 0) {
    this.item.fullStats = this.valuesService.mergeStats(this.item.sparkStats, this.item.fullStats);
  }
}

getBuilds() {
  var builds = this.saveService.getSavedItems();
  this.builds = builds;
}
}
