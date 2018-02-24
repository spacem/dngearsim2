import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import { DntService } from './dnt.service';

class ItemSourceData {
  name: string;
  mainDnt?: string;
  potentialDnt?: string;
  potentialDntEx?: string;
  sparkDnt?: string;
  gemSlotDnt?: string;
  enchantDnt?: string;
  enchantDnt2?: string;
  gemDnt?: string;
  partsDnt?: string;
  petDnt?: string;
  petLevelDnt?: string;
  type?: string;
  weaponDnt?: string;
  setDnt?: string;
  minLevel?: number;
  minRank?: number;
  ignoreErrors?: boolean;
}

export class ItemSource extends ItemSourceData {
  constructor(
    private translationService: TranslationService,
    private dntService: DntService) {
    super();
  }

  loading = false;
  items = null;

  async init() {
    this.loading = true;
    const p: Promise<any>[] = [
      this.translationService.init(),
      this.dntService.init(this.mainDnt)];

    if (this.potentialDnt) {
      p.push(this.dntService.init(this.potentialDnt))
    }
    if (this.potentialDntEx) {
      p.push(this.dntService.init(this.potentialDntEx));
    }
    if (this.gemDnt) {
      p.push(this.dntService.init(this.gemDnt));
    }

    await Promise.all(p);

    this.loading = false;
  }

  reset() {
    this.items = null;
    this.loading = false;
  }
}


@Injectable()
export class ItemSourceService {

  sources: {[name: string]: ItemSource} = {};

  constructor(
    private translationService: TranslationService,
    private dntService: DntService) {
    this.setup();
  }

  setup() {
    this.createSource({
      name: 'title',
      mainDnt: 'appellationtable.optimised.json',
      type: 'titles',
      minLevel: 0,
      minRank: 0
    });
   this.createSource({
      name: 'tech',
      mainDnt: 'itemtable_skilllevelup.optimised.json',
      potentialDnt: 'potentialtable.optimised.json',
      potentialDntEx: 'potentialtable_reboot.optimised.json',
      sparkDnt: 'potentialtable_potentialjewel.optimised.json',
      gemSlotDnt: 'dragonjewelslottable.lzjson',
      type: 'techs',
      minLevel: 60,
      minRank: 0
    });

    this.createSource({
      name: 'tman',
      mainDnt: 'itemtable_talisman.optimised.json',
      type: 'talisman',
      potentialDnt: 'potentialtable_talismanitem.optimised.json',
      minLevel: 24,
      minRank: 0
    });

    this.createSource({
      name: 'gem',
      mainDnt: 'itemtable_dragonjewel.optimised.json',
      potentialDnt: 'potentialtable_dragonjewel.optimised.json',
      potentialDntEx: 'potentialtable_reboot.optimised.json',
      enchantDnt: 'enchanttable_dragonjewel.optimised.json',
      gemDnt: 'dragonjeweltable.optimised.json',
      type: 'gems',
      minLevel: 24,
      minRank: 3
    });

    this.createSource({
      name: 'plate',
      mainDnt: 'itemtable_glyph.optimised.json',
      potentialDnt: 'potentialtable_glyph.optimised.json',
      type: 'plates',
      minLevel: 16,
      minRank: 2
    });
    this.createSource({
      name: 'plate95',
      mainDnt: 'itemtable_glyph95.lzjson',
      potentialDnt: 'potentialtable_glyph95.lzjson',
      type: 'plates',
      minLevel: 1,
      minRank: 1,
      ignoreErrors: true
    });

    this.createSource({
      name: 'items',
      mainDnt: 'itemtable.optimised.json',
      partsDnt: 'partstable.optimised.json',
      weaponDnt: 'weapontable.optimised.json',
      enchantDnt: 'enchanttable.optimised.json',
      potentialDnt: 'potentialtable.optimised.json',
      setDnt: 'setitemtable.optimised.json',
      gemSlotDnt: 'dragonjewelslottable.lzjson',
      type: 'equipment',
      minLevel: 80,
      minRank: 3
    });
    this.createSource({
      name: 'eq',
      mainDnt: 'itemtable_equipment.optimised.json',
      partsDnt: 'partstable_equipment.optimised.json',
      weaponDnt: 'weapontable_equipment.optimised.json',
      enchantDnt: 'enchanttable.optimised.json',
      potentialDnt: 'potentialtable.optimised.json',
      sparkDnt: 'potentialtable_potentialjewel.optimised.json',
      setDnt: 'setitemtable.optimised.json',
      gemSlotDnt: 'dragonjewelslottable.lzjson',
      type: 'equipment',
      minLevel: 21,
      minRank: 3
    });
    this.createSource({
      name: 'rbeq',
      mainDnt: 'itemtable_reboot.optimised.json',
      partsDnt: 'partstable_reboot.optimised.json',
      weaponDnt: 'weapontable_reboot.optimised.json',
      enchantDnt: 'enchanttable_reboot.optimised.json',
      enchantDnt2: 'enchanttable_95.lzjson',
      potentialDnt: 'potentialtable_reboot.optimised.json',
      setDnt: 'setitemtable.optimised.json',
      gemSlotDnt: 'dragonjewelslottable.lzjson',
      type: 'equipment',
      minLevel: 24,
      minRank: 3
    });
    this.createSource({
      name: 'pvpeq',
      mainDnt: 'itemtable_pvp.optimised.json',
      partsDnt: 'partstable_pvp.optimised.json',
      weaponDnt: 'weapontable_pvp.optimised.json',
      enchantDnt: 'enchanttable.optimised.json',
      setDnt: 'setitemtable.optimised.json',
      type: 'equipment',
      gemSlotDnt: 'dragonjewelslottable.lzjson',
      minLevel: 24,
      minRank: 3
    });

    this.createSource({
      name: 'cCommon',
      mainDnt: 'itemtable_commoncash.lzjson',
      partsDnt: 'partstable_commoncash.lzjson',
      weaponDnt: 'weapontable_commoncash.lzjson',
      setDnt: 'setitemtable_cash.lzjson',
      type: 'cash',
      minLevel: 0,
      ignoreErrors: true,
      minRank: 4
    });
    this.createSource({
      name: 'cClone',
      mainDnt: 'itemtable_cashclone.optimised.json',
      partsDnt: 'partstable_cashclone.optimised.json',
      type: 'cash',
      minLevel: 0,
      ignoreErrors: true,
      minRank: 4
    });
    this.createSource({
      name: 'c2016',
      mainDnt: 'itemtable_common2016.optimised.json',
      partsDnt: 'partstable_common2016.optimised.json',
      weaponDnt: 'weapontable_common2016.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'c2017',
      mainDnt: 'itemtable_common2017.optimised.json',
      partsDnt: 'partstable_common2017.optimised.json',
      weaponDnt: 'weapontable_common2017.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      ignoreErrors: true,
      minRank: 0
    });
    this.createSource({
      name: 'c2015',
      mainDnt: 'itemtable_common2015.optimised.json',
      partsDnt: 'partstable_common2015.optimised.json',
      weaponDnt: 'weapontable_common2015.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'c2014',
      mainDnt: 'itemtable_common2014.optimised.json',
      partsDnt: 'partstable_common2014.optimised.json',
      weaponDnt: 'weapontable_common2014.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'cash',
      mainDnt: 'itemtable_cash.optimised.json',
      partsDnt: 'partstable_cash.optimised.json',
      weaponDnt: 'weapontable_cash.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'event',
      mainDnt: 'itemtable_event.optimised.json',
      partsDnt: 'partstable_event.optimised.json',
      weaponDnt: 'weapontable_event.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      type: 'cash',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'xtras',
      mainDnt: 'itemtable_vehicle.optimised.json',
      partsDnt: 'vehiclepartstable.optimised.json',
      setDnt: 'setitemtable_cash.optimised.json',
      petDnt: 'vehicletable.lzjson',
      petLevelDnt: 'petleveltable.lzjson',
      type: 'xtras',
      minLevel: 0,
      minRank: 0
    });
    this.createSource({
      name: 'imprint',
      mainDnt: 'itemtable_imprinting.optimised.json',
      type: 'imprint',
      minLevel: 0,
      minRank: 0
    });
}

  createSource(data: ItemSourceData) {
    const source = new ItemSource(this.translationService, this.dntService);
    Object.assign(source, data);
    this.sources[source.name] = source;
  }
}
