import { Injectable } from '@angular/core';
import { ItemSourceService } from './item-source.service';
import { DntService } from './dnt.service';
import { JobService } from './job.service';

@Injectable()
export class DntInitService {

  allFactories: any[] = [this.jobService];

  constructor(
    private itemSourceService: ItemSourceService,
    private dntService: DntService,
    private jobService: JobService) {
  }

  init() {
    var dntFiles = {};
    for (let sourceKey of Object.keys(this.itemSourceService.sources)) {
      if (sourceKey != 'all') {
        const item = this.itemSourceService.sources[sourceKey];
        for (let prop of Object.keys(item)) {
          const value = item[prop];
          if (prop.indexOf('Dnt') == prop.length - 3) {
            var newFactory = {
              init: (progress, complete) => {
                this.dntService.init(value);
              },
              isLoaded: () => {
                return this.dntService.isLoaded(value);
              },
              fileName: value,
            };

            this.allFactories.push(newFactory);
          }
        }
      }
    }
  }

  async initFactory(index: number) {

    if (index < this.allFactories.length) {
      await this.allFactories[index].init();
      if (this.allFactories[index].isLoaded()) {
        if ('fileName' in this.allFactories[index]) {
          // progress('dnt loaded: ' + allFactories[index].fileName);
        }
        return this.initFactory(index + 1);
      }
    }
  }
}
