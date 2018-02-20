import { Injectable } from '@angular/core';
import { ValuesService } from '../core/values.service';
import { JobService } from '../core/job.service';
import { DntService } from '../core/dnt.service';

const jobConversions = 'rebootplayerweighttable.lzjson';
const statCaps = 'playercommonleveltable.lzjson';
const jobBaseStats = 'playerleveltable.optimised.json';

const heroLevels = 'heroleveltable.lzjson';
const heroLevelPotentials = 'potentialtable_herolevel.lzjson';

@Injectable()
export class CharacterService {

  constructor(
    private dntService: DntService,
    private jobService: JobService,
    private valuesService: ValuesService) {
  }

  async init(complete: any) {
    await this.jobService.init();
    await this.dntService.init(jobConversions);
    await this.dntService.init(statCaps);
    await this.dntService.init(jobBaseStats);
    await this.dntService.init(heroLevels);
    await this.dntService.init(heroLevelPotentials);
  }

  getHeroStats(heroLevel: any) {
    var heroStats = [];
    if (heroLevel > 0) {
      var index = this.dntService.findFast(heroLevels, 'id', heroLevel);
      if (index.length == 1) {
        var h = this.dntService.getRow(heroLevels, index[0]);
        if (h) {
          var pIndex = this.dntService.findFast(heroLevelPotentials, 'PotentialID', h.HeroLevelAbilityID);
          if (pIndex.length == 1) {
            var p = this.dntService.getRow(heroLevelPotentials, pIndex[0]);
            if (p) {
              heroStats = this.valuesService.getStats(p);
            }
          }
        }
      }
    }
    return heroStats;
  }

  getStatCaps(level: any) {
    if (level > 0) {
      var index = this.dntService.findFast(statCaps, 'id', level);
      if (index.length == 1) {
        return this.dntService.getRow(statCaps, index[0]);
      }
    }

    return {};
  }

  getConversions(jobId: any) {
    if (jobId > 0) {
      var index = this.dntService.findFast(jobConversions, 'id', jobId);
      if (index.length == 1) {
        return this.dntService.getRow(jobConversions, index[0]);
      }
    }

    return {};
  }

  getBaseStats(level: any, jobId: any) {
    if (level > 0 && jobId > 0) {
      var index = this.dntService.findFast(jobBaseStats, 'id', (Number(jobId) * 100) + Number(level) - 100);
      if (index.length == 1) {
        return this.dntService.getRow(jobBaseStats, index[0]);
      }
    }

    return {};
  }
}
