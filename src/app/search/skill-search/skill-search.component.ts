import { Component, OnInit } from '@angular/core';
import { ItemCategoryService } from '../../core/item-category.service';
import { TranslationService } from '../../core/translation.service';
import { JobService } from '../../core/job.service';
import { DntService } from '../../core/dnt.service';
import { RegionService } from '../../core/region.service';
import { ValuesService } from '../../core/values.service';

@Component({
  selector: 'app-skill-search',
  templateUrl: './skill-search.component.html',
  styleUrls: ['./skill-search.component.scss']
})
export class SkillSearchComponent implements OnInit {

  allJobs: any[] = [];
  jobs: any[] = [];
  job: any;
  dntName = '';
  skills: any[] = [];
  loadedJobId = -1;
  itemCategory = this.itemCategoryService.byName('skills');

  nameSearch = localStorage.getItem('nameSearch');

  constructor(
    private itemCategoryService: ItemCategoryService,
    private translationService: TranslationService,
    private jobService: JobService,
    private dntService: DntService,
    private regionService: RegionService,
    private valuesService: ValuesService) {
  }

  async ngOnInit() {
    if (!this.nameSearch) {
      this.nameSearch = '';
    }

    await this.regionService.init();
    if (!this.translationService.isLoaded()) {
      await this.translationService.init();
    }

    await this.jobService.init();
    await this.jobInit();
    await this.getSkills();
  }

  jobInit() {
    var newJobs = this.jobService.getFinalJobs();

    if (this.jobs && this.jobs.length) {
      newJobs.splice(0, 0, this.jobs[0]);
    }
    this.jobs = newJobs;
    this.allJobs = this.jobService.getAllJobs();

    var lastJobNumber = Number(localStorage.getItem('jobNumber'));
    // console.log('using job', lastJobNumber);
    if (lastJobNumber != null) {
      newJobs.forEach(value => {
        if (value.id == lastJobNumber) {
          this.job = value;
          // console.log('using job', value);
          return;
        }
      });
    }

    this.getResults();
  }
  
  getDntName(baseClassName) {
    // console.log('got base class :' + baseClassName);
    if (baseClassName != null) {
      return 'skilltable_character' + baseClassName.toLowerCase() + '.lzjson';
    }
    else {
      return null;
    }
  }

  async getSkills() {
    // console.log('getting skills for ', this.job);
    if (this.job && this.loadedJobId != this.job.id) {

      var baseJobNames = [];
      if (this.job.id >= 0) {
        var baseName = this.jobService.getBaseJobName(this.job);
        baseJobNames.push(baseName);
      }

      for(const baseName of baseJobNames) {
        var dntName = this.getDntName(baseName);
        if (dntName) {
          if (!this.dntService.isLoaded(dntName)) {
            // console.log('loading skills for ' + baseName);
            await this.dntService.init(dntName);
          }
        }
      }
      this.setupSkills(baseJobNames, this.job);
    }
  }

  setupSkills(baseJobNames, job) {
    baseJobNames.forEach(baseName => {
        var dntName = this.getDntName(baseName);

        var skills = this.dntService.getData(dntName);
        var numSkills = skills.length;
        for (var s = 0; s < numSkills; ++s) {
          if (skills[s].NameID == 0) {
            continue;
          }

          if (skills[s].EffectClass1 > 0 ||
            skills[s].EffectClass2 > 0 ||
            skills[s].EffectClass3 > 0 ||
            skills[s].EffectClass4 > 0 ||
            skills[s].EffectClass5 > 0 ||
            skills[s].EffectClass6 > 0) {

            var newItem: any = { d: skills[s] };

            newItem.id = skills[s].id;
            newItem.typeName = 'skills';
            newItem.itemSource = 'skills';
            newItem.name = this.translationService.translate(skills[s].NameID, skills[s].NameIDParam);
            newItem.needJobClass = skills[s].NeedJob;
            newItem.rank = this.valuesService.rankNames[0];
            newItem.baseJobName = baseName.toLowerCase();
            newItem.icon = skills[s].IconImageIndex;

            this.skills.push(newItem);
          }
        }
      });

      this.loadedJobId = job.id;
  }

    getResults() {
      // console.log('getting results', this.skills);

      if (this.skills == null) {
        return [];
      }

      if (this.job && this.job.id >= 0) {
        localStorage.setItem('jobNumber', this.job.id);
      }
      localStorage.setItem('nameSearch', this.nameSearch);

      var newResults = [];
      var numSkills = this.skills.length;
      var curDisplay = 0;
      for (var i = 0; i < numSkills; ++i) {
        var e = this.skills[i];

        if (this.nameSearch != '') {
          var nameSearches = this.nameSearch.split(' ');
          if (!nameSearches.length) {
            nameSearches = [this.nameSearch];
          }
          var allMatch = true;
          for (var ns = 0; ns < nameSearches.length; ++ns) {
            if (e.name && e.name.toString().toUpperCase().indexOf(nameSearches[ns].toUpperCase()) == -1) {
              allMatch = false;
              break;
            }
          }

          if (!allMatch) {
            continue;
          }
        }

        if (this.job.id >= 0 && !this.job.isClassJob(e.needJobClass)) {
          continue;
        }

        newResults.push(e);
      }
      // console.log('got results', newResults);
      return newResults;
    }
}
