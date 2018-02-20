import { Injectable } from '@angular/core';
import { DntService } from './dnt.service';
import { TranslationService } from './translation.service';

const fileName = 'jobtable.lzjson';

@Injectable()
export class JobService {

  constructor(
    private dntService: DntService,
    private translationService: TranslationService
  ) {
  }

  fileName = fileName;
  allJobs: any[] = null;

  isLoaded() {
    return this.dntService.isLoaded(fileName);
  }

  hasStartedLoading() {
    return this.dntService.hasStartedLoading(fileName);
  }

  init() {
    return this.dntService.init(fileName);
  }

  reset() {
    this.allJobs = null;
    this.dntService.reset(fileName);
  }

  getFinalJobs() {
    var jobs = [];
    var alljobs = this.getAllJobs();
    if (alljobs) {
      var numRows = alljobs.length;
      for (var r = 0; r < numRows; ++r) {
        if (alljobs[r].d.JobNumber == 2 && alljobs[r].d.JobIcon > 0) {
          jobs.push(alljobs[r]);
        }
      }
    }

    return jobs;
  }

  getBaseJobs() {
    var baseJobs: any = {};
    this.getFinalJobs().forEach(job => {
      baseJobs[this.getBaseJobName(job)] = job;
    });


    return Object.values(baseJobs);
  }

  getAllJobs() {
    if (this.allJobs == null && this.isLoaded() && this.translationService.isLoaded()) {
      var jobs = [];
      var data = this.dntService.getData(fileName);
      var numRows = data.length;
      for (var r = 0; r < numRows; ++r) {
        jobs[jobs.length] = this.createJob(data[r]);
      }

      this.allJobs = jobs;
    }
    return this.allJobs;
  }

  getById(id: any) {
    var data = this.getAllJobs();
    if (data) {
      var numRows = data.length;
      for (var r = 0; r < numRows; ++r) {
        if (data[r].id == id) {
          return data[r];
        }
      }
    }
  }

  createJob(d: any) {
    var t = this;
    return {
      d: d,
      id: d.id,
      name: this.translationService.translate(d.JobName),
      isClassJob: function (c) {
        return t.isClassJob(d, c);
      }
    };
  }

  isClassJob(d: any, c: any) {
    if (!c) return true;
    if (d.id == c) {
      return true;
    }

    var parentJob = d.ParentJob;

    if (!parentJob) return false;
    if (parentJob == c) return true;

    var parentJobData = this.getById(parentJob);
    if (parentJobData) {
      return this.isClassJob(parentJobData.d, c);
    }

    return false;
  }

  getBaseJobName(job: any) {
    if (this.isLoaded()) {
      var alljobs = this.getAllJobs();
      if (alljobs) {
        var numRows = alljobs.length;
        for (var r = 0; r < numRows; ++r) {
          if (alljobs[r].id == (job.d.BaseClass + 1) && alljobs[r].d.EnglishName) {
            return alljobs[r].d.EnglishName;
          }
        }
      }
    }

    return null;
  }
}