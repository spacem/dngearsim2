import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DntService } from '../../core/dnt.service';
import { ItemSourceService, ItemSource } from '../../core/item-source.service';
import { ValuesService } from '../../core/values.service';
import { ItemFactoryService } from '../../core/item-factory.service';

@Component({
  selector: 'app-item-edit-enchantment',
  templateUrl: './item-edit-enchantment.component.html',
  styleUrls: ['./item-edit-enchantment.component.scss']
})
export class ItemEditEnchantmentComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();

  itemType: ItemSource;
  enchantments: any[] = null;
  enchantment: any = null;
  enchantmentAfter: any = null;
  enchantmentCost = '';
  enhancementOptions: any[] = [];
  materials: any[] = [];
  fileName = 'all-items.lzjson';

  constructor(
    private dntService: DntService,
    private itemSourceService: ItemSourceService,
    private valuesService: ValuesService,
    private itemFactoryService: ItemFactoryService
  ) {
  }

  async ngOnInit() {
    if (!this.item || !this.item.enchantmentId) {
      return;
    }

    if ('itemSource' in this.item) {
      this.itemType = this.itemSourceService.sources[this.item.itemSource];
    }

    if (!this.itemType) {
      return;
    }
    if (!('enchantDnt' in this.itemType) && !('petLevelDnt' in this.itemType)) {
      return;
    }

    if (this.itemType.enchantDnt) {
      await this.dntService.init(this.itemType.enchantDnt);
    }
    if (this.itemType.enchantDnt2) {
      await this.dntService.init(this.itemType.enchantDnt2);
    }

    if (this.itemType.petLevelDnt) {
      await this.dntService.init(this.itemType.petDnt);
      await this.dntService.init(this.itemType.petLevelDnt);
    }

    this.setupEnchantments();

    if (this.item.enchantmentStats == null) {
      this.item.enchantmentStats = [];
    }

    if (this.dntService.isLoaded(this.fileName)) {
      this.showMaterials();
    }
  }
  
  setEnchantment() {
    this.item.enchantmentStats = [];

    if (this.enchantments && this.enchantments.length > 0) {

      if (typeof this.item.enchantmentNum != 'number') {
        this.item.enchantmentNum = 0;
        // this.itemChange.emit();
      }

      for (var i = 0; i < this.enchantments.length; ++i) {
        if (this.item.enchantmentNum == this.getEnchantLevel(i)) {
          this.enchantment = this.enchantments[i];

          this.item.enchantmentStats = this.valuesService.getStats(this.enchantment);
        }
        else if (this.item.enchantmentNum + 1 == this.getEnchantLevel(i)) {
          this.enchantmentAfter = this.enchantments[i];
          if (this.enchantmentAfter.NeedCoin < 10000) {
            this.enchantmentCost = Math.round(this.enchantmentAfter.NeedCoin / 1000) / 10 + 'g';
          }
          else {
            this.enchantmentCost = Math.round(this.enchantmentAfter.NeedCoin / 10000) + 'g';
          }
        }
      }
    }
  }

  getEnchantLevel(num) {
    if ('petLevelDnt' in this.itemType) {
      return this.enchantments[num].PetLevel;
    }
    else {
      return this.enchantments[num].EnchantLevel;
    }
  }

  setPetLevel() {
    this.item.enchantmentStats = [];

    if (this.enchantments && this.enchantments.length > 0) {

      if (typeof this.item.enchantmentNum != 'number') {
        this.item.enchantmentNum = 6;
        // this.itemChange.emit();
      }

      for (var i = 0; i < this.enchantments.length; ++i) {
        if (this.item.enchantmentNum == this.enchantments[i].PetLevel) {
          this.enchantment = this.enchantments[i];

          this.item.enchantmentStats = this.valuesService.getStats(this.enchantment);
        }
      }
    }
  }

  isMaxEnchantLevel() {
    if (this.enchantments != null &&
      this.enchantments.length > 0 &&
      typeof this.item.enchantmentNum == 'number') {

      for (var i = 0; i < this.enchantments.length; ++i) {
        if (this.item.enchantmentNum + 1 == this.getEnchantLevel(i)) {
          return false;
        }
      }
      return true;
    }
    else {
      return false;
    }
  }

  setEnchantmentNum(enhancementOption) {
    this.item.enchantmentNum = enhancementOption;
    this.enhancementOptions = [];
    if ('petLevelDnt' in this.itemType) {
      this.setPetLevel();
    }
    else {
      this.setEnchantment();
    }
    this.itemChange.emit();
  }

  nextEnchantment() {
    for (var i = this.item.enchantmentNum; i == 0 || this.enchantments[i - 1]; ++i) {
      if (i == 0) {
        this.enhancementOptions.push({ number: 0 });
      }
      else {
        this.enhancementOptions.push(this.getOption(i - 1));
      }
    }
  }

  prevEnchantment() {
    this.enhancementOptions = [];
    for (var i = this.item.enchantmentNum; i > 0; --i) {
      this.enhancementOptions.push(this.getOption(i - 1));
    }

    this.enhancementOptions.push({ number: 0 });
  }

  getOption(enchantmentNum) {
    return {
      number: this.getEnchantLevel(enchantmentNum),
      stats: this.valuesService.getStats(this.enchantments[enchantmentNum])
    };
  }

  setupEnchantments() {
    if (this.itemType.enchantDnt && this.dntService.isLoaded(this.itemType.enchantDnt)) {
      this.enchantments = this.dntService.find(this.itemType.enchantDnt, 'EnchantID', this.item.enchantmentId);
      if (!this.enchantments.length && this.itemType.enchantDnt2) {
        this.enchantments = this.dntService.find(this.itemType.enchantDnt2, 'EnchantID', this.item.enchantmentId);
      }
      this.setEnchantment();
    }
    if (this.itemType.petLevelDnt && this.dntService.isLoaded(this.itemType.petLevelDnt)) {
      this.enchantments = this.dntService.find(this.itemType.petLevelDnt, 'PetLevelTypeID', this.item.enchantmentId);
      this.setPetLevel();
    }
  }

  async showMaterials() {
    this.dntService.init(this.fileName);

    if (!this.enchantmentAfter) {
      return;
    }

    this.materials = [];
    for (var i = 1; i <= 5; ++i) {
      var itemId = this.enchantmentAfter['NeedItemID' + i];
      var itemCount = this.enchantmentAfter['NeedItemCount' + i];
      if (itemId > 0 && itemCount > 0) {

        var items = this.dntService.find(this.fileName, 'id', itemId);
        if (items.length == 0) {
          this.materials.push({ num: itemCount, name: 'unknown (' + itemId + ')' });
        }
        else {
          var item = items[0];
          if (item) {
            var material = {
              item: this.itemFactoryService.createBasicItem(item),
              num: itemCount,
            };
            this.materials.push(material);
          }
        }
      }
    }
  }
}
