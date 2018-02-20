import { Injectable } from '@angular/core';
import { ItemSourceService } from './item-source.service';
import { JobService } from './job.service';
import { DntService } from './dnt.service';

@Injectable()
export class DntResetService {

  constructor(
    private itemSourceService: ItemSourceService,
    private jobService: JobService,
    private dntService: DntService
  ) { }

  reset() {
    for(let name in Object.keys(this.itemSourceService.sources)) {
      this.itemSourceService.sources[name].reset();
    }

    this.jobService.reset();
    this.dntService.resetAll();
  }

}
