import { Component, OnInit, Input } from '@angular/core';
import { ValuesService } from '../values.service';
import { TranslateService } from '@ngx-translate/core';

interface StatDisplay {
  set: string;
  title: string;
  value: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() stats: any[];
  @Input() altStats: any[];
  @Input() build: any;
  @Input() filter: string;
  @Input() numInSet: number;
  @Input() brSeparator: boolean;
  @Input() pipeSeparator: boolean;

  constructor(
    private valuesService: ValuesService,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  getStatDisplay() {
    let statDisplay = [];
    var stats = this.stats;
    if (!stats) {
      stats = this.altStats;
    }
    if (!stats || !stats.length || !Array.isArray(stats)) {
      return;
    }

    // get stats that are used to summarise
    var summaryForStats = {};
    stats.forEach(stat => {
      var def = this.valuesService.stats[stat.id];
      if (def && def.summaryFor) {
        summaryForStats[def.summaryFor] = stat;
      }
    });

    stats.forEach(stat => {
      let output = '';
      let title = '';
      let set: string = null;

      if (stat.id in this.valuesService.stats) {
        title = '';

        var def = this.valuesService.stats[stat.id];
        if (!this.filter && 'hide' in def && def.hide) {
          return;
        }

        if (this.filter && !def[this.filter]) {
          return;
        }

        if (def.summaryFor) {
          return;
        }

        if ('needSetNum' in stat) {
          set = '';
          if (stat.needSetNum <= this.numInSet) {
            set += '*';
          }
          set += stat.needSetNum + '&nbsp;';
        }

        if (this.build) {
          if (def.element == 'primary') {
            var eleId = 0;
            if (this.build.element) {
              eleId = this.build.element.id;
            }
            title += this.translateService.instant(this.valuesService.elements[eleId].name) + '&nbsp;';
          }
          else if (def.element == 'secondary') {
            var eleId = 0;
            if (this.build.secondaryElement) {
              eleId = this.build.secondaryElement.id;
            }
            title += this.translateService.instant(this.valuesService.elements[eleId].name) + '&nbsp;';
          }
        }

        title += this.translateService.instant(def.name);
        output += def.display(stat);
        if (def.combineWith > 0) {
          stats.forEach(stat2 => {
            if (stat2.id == def.combineWith) {
              if (stat2.max != stat.max) {
                output += '-' + def.display(stat2);
              }
            }
          });
        }

        if (stat.id in summaryForStats) {
          var sStat = summaryForStats[stat.id];
          var sDef = this.valuesService.stats[sStat.id];
          output += '&nbsp;|&nbsp;' + sDef.display(sStat);
        }
        else {
          statDisplay.push({
            set: set,
            title: title,
            value: output
          });
        }
      }
      else {
        if ('needSetNum' in stat) {
          output += stat.needSetNum + '-Increases&nbsp;';
        }

        output += stat.id + ':&nbsp;' + stat.max;
        statDisplay.push({
          set: set,
          title: title,
          value: output
        });
      }
    });
    return statDisplay;
  }
}
