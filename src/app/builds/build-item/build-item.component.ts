import { Component, OnInit, Input } from '@angular/core';
import { ValuesService } from '../../core/values.service';

@Component({
  selector: 'app-build-item',
  templateUrl: './build-item.component.html',
  styleUrls: ['./build-item.component.scss']
})
export class BuildItemComponent implements OnInit {

  gemSlots = this.valuesService.gemExchanges;
  @Input() item;
  @Input() builds;
  @Input() editMode: boolean;

  constructor(
    private valuesService: ValuesService
  ) { }

  ngOnInit() {
  }
  
  getGemSlotName(item) {
    if(item.gemSlot) {
      for(var i=0;i<this.gemSlots.length;++i) {
        if(this.gemSlots[i].id == item.gemSlot) {
          return this.gemSlots[i].name;
        }
      }
    }
  }
  
  setFullStats() {
    // full stats are cleared when publishing builds
    this.item.fullStats = this.item.stats;
    
    if(this.item.enchantmentStats != null && this.item.enchantmentStats.length > 0) {
      this.item.fullStats = this.valuesService.mergeStats(this.item.enchantmentStats, this.item.fullStats);
    }
    
    if(this.item.sparkStats != null && this.item.sparkStats.length > 0) {
      this.item.fullStats = this.valuesService.mergeStats(this.item.sparkStats, this.item.fullStats);
    }
  }

}
