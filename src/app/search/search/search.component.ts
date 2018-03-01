import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegionService } from '../../core/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../core/translation.service';
import { ItemCategoryService } from '../../core/item-category.service';
import { ValuesService } from '../../core/values.service';
import { JobService } from '../../core/job.service';
import { ItemFactoryService } from '../../core/item-factory.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  
  paramSubscription: Subscription;
  regionSubscription: Subscription;
  origJobNumber: number;
  rankChecked: any = { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true };
  nameSearch = '';
  origMaxLevel: number;
  origMinLevel: number;
  origSavedSearchStatId: number;
  job = {id: -1, name: ''};
  jobs = [this.job];
  allJobs = [];
  minLevel = 1;
  maxLevel = 99;
  maxDisplay = 10;
  totalNumResults = 0;
  ranks = Object.values(this.valuesService.rankNames);
  stat: any = {id:-1, name:''};
  stats = [this.stat];
  results = null;
  itemCategory: any;

  constructor(
    private regionService: RegionService,
    private translationService: TranslationService,
    private itemCategoryService: ItemCategoryService,
    private valuesService: ValuesService,
    private jobService: JobService,
    private itemFactoryService: ItemFactoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.regionSubscription = this.regionService.regionChangeSubject.subscribe(() => {
      this.router.navigate(['/', this.regionService.dntLocation.region, 'search', this.itemCategory.name]);
    });

    this.itemCategory = this.itemCategoryService.byName(this.route.snapshot.paramMap.get('category'));
    // console.log('got category', this.itemCategory);
    if(this.itemCategory) {
      this.save();
    }

    await Promise.all([
      this.regionService.init(),
      this.jobService.init(),
      this.itemCategoryService.init(this.itemCategory.name)]);

    this.jobInit();
    this.setup();
    this.loadResults();

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      // console.log('cat change');
      this.itemCategory = this.itemCategoryService.byName(params.get('category'));
      if(this.itemCategory) {
        this.itemCategoryService.init(this.itemCategory.name).then(() => {
          this.loadResults();
        });
      }
    });
  }

  ngOnDestroy() {
    if(this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if(this.regionSubscription) {
      this.regionSubscription.unsubscribe();
    }
  }

  setup() {
    // this.itemCategory = this.itemCategoryService.byPath($routeParams.cat);
    if(!this.itemCategory) {
      var catName = localStorage.getItem('selectedItemCategory');
      if(!catName) {
        catName = 'titles';
      }
      
      this.itemCategory = this.itemCategoryService.byName(catName);
      if(!this.itemCategory || this.itemCategory.hideInSearch) {
        catName = 'titles';
        this.itemCategory = this.itemCategoryService.byName('titles');
      }
      if(this.itemCategory) {
        // console.log('moving');
        // TODO:
        // this.router.navigate(
        // $location.search('cat', this.itemCategory.path);
        // $route.reload();
      }
      return;
    }
  
    Object.values(this.valuesService.stats).forEach(stat => {
      if(stat.searchable) {
        this.stats.push(stat);
      }
    });
    
    var minLevel = Number(localStorage.getItem('minLevel'));
    this.origMinLevel = minLevel;

    var maxLevel = Number(localStorage.getItem('maxLevel'));
    this.origMaxLevel = maxLevel;

    this.nameSearch = localStorage.getItem('nameSearch');
    this.origSavedSearchStatId = Number(localStorage.getItem('searchStat'));
    this.rankChecked = this.valuesService.checkedRank;

    /*
    if($routeParams.minLevel) {
      minLevel = Number($routeParams.minLevel);
    }
    if(minLevel > 0 && minLevel < 100) {
      this.minLevel = minLevel;
    }    
    if($routeParams.maxLevel) {
      maxLevel = Number($routeParams.maxLevel);
    }
    if(maxLevel > 0 && maxLevel < 100) {
      this.maxLevel = maxLevel;
    }
    
    if($routeParams.name) {
      this.nameSearch = $routeParams.name;
    }
    if(!this.nameSearch) {
      this.nameSearch = '';
    }
    
    if($routeParams.stat) {
      this.origSavedSearchStatId = $routeParams.stat;
    }
    if(this.origSavedSearchStatId > -1 && this.origSavedSearchStatId in this.valuesService.stats) {
      this.stat = this.valuesService.stats[this.origSavedSearchStatId];
    }
    */
  }

  save() {
    if(!this.itemCategory.hideLevel) {
      if(this.minLevel != this.origMinLevel) {
        localStorage.setItem('minLevel', this.minLevel.toString());
        // $location.search('minLevel', this.minLevel);
        this.origMinLevel = this.minLevel;
      }
      
      if(this.maxLevel != this.origMaxLevel) {
        localStorage.setItem('maxLevel', this.maxLevel.toString());
        // $location.search('maxLevel', this.maxLevel);
        this.origMaxLevel = this.maxLevel;
      }
    }
    else {
      // $location.search('minLevel', null);
      // $location.search('maxLevel', null);
    }
    
    if(!this.itemCategory.hideJob) {
      if(this.job != null) {
        if(this.origJobNumber != this.job.id) {
          localStorage.setItem('jobNumber', this.job.id.toString());
          if(this.job.id > -1) {
            // $location.search('job', this.job.id);
          }
          else {
            // $location.search('job', null);
          }
          this.origJobNumber = this.job.id;
        }
      }
    }
    else {
      // $location.search('job', null);
    }
  
    if(this.stat) {
      if(this.origSavedSearchStatId !== this.stat.id) {
        localStorage.setItem('searchStat', this.stat.id.toString());
        if(this.stat.id > -1) {
          // $location.search('stat', this.stat.id);
        }
        else {
          // $location.search('stat', null);
        }
        
        this.origSavedSearchStatId = this.stat.id;
      }
    }

    localStorage.setItem('nameSearch', this.nameSearch);
    // $location.search('name', this.nameSearch);
  };

  async jobInit() {
    if(this.translationService.isLoaded() && this.jobService.isLoaded()) {
      // console.log('trying to init jobs');
      // console.log('job dropdown should be set');
      var newJobs = this.jobService.getFinalJobs();

      newJobs.splice(0, 0, this.jobs[0]);
      this.jobs = newJobs;
      this.allJobs = this.jobService.getAllJobs();
      
      var lastJobNumber = Number(localStorage.getItem('jobNumber'));
      // if($routeParams.job && $routeParams.job) {
        // lastJobNumber = Number($routeParams.job);
      // }
      if(lastJobNumber != null && newJobs != null) {
        newJobs.forEach(value => {
          if(value.id === lastJobNumber) {
            this.job = value;
            return;
          }
        });
      }
    }
  }
    
  changeSearch() {
    this.save();
    this.loadResults();
  }
  
  loadResults() {
    this.maxDisplay = 24;
    this.results = this.getResults();
    //console.log('loaded results');
  }
  
  getResults() {
    var allItems = this.itemCategoryService.getItems(this.itemCategory.name);
    if(allItems == null) {
      //console.log('no items in cat');
      return null;
    }
    
    allItems = allItems.sort(function(item1, item2) {
        return (item2.levelLimit - item1.levelLimit);
      });
          
    var pcStatId = -1;
    if('pc' in this.stat) {
      pcStatId = this.stat.pc;
    }
          
    var altStatId = -1;
    if('altStat' in this.stat) {
      altStatId = this.stat.altStat;
    }
  
    var statVals = [];
    var newResults = [];
    var numEquip = allItems.length;
    var curDisplay = 0;
    for(var i=0;i<numEquip && (curDisplay<this.maxDisplay || this.stat.id >= 0);++i) {
      var e = allItems[i];
      if(e) {
        
        if(!this.itemCategory.hideLevel) {
          if(e.levelLimit < this.minLevel || e.levelLimit > this.maxLevel) {
            continue;
          }
        }
          
        if(!this.itemCategory.hideRank) {
          if(e.rank && !this.rankChecked[e.rank.id]) {
            continue;
          }
        }
          
        if(!this.itemCategory.hideJob) {
          if(this.job && this.job.id > -1) {
            if(!this.jobService.isClassJob(e.needJobClass, this.job.id)) {
              continue;
            }
          }
        }
        
        this.itemFactoryService.initItem(e);
        if(e.typeName != this.itemCategory.name) {
          continue;
        }
        // console.log('name filter', this.nameSearch); 
        
        if(this.nameSearch != '') {
          // console.log('filtering on name');
          var nameSearches = this.nameSearch.split(' ');
          if(!nameSearches.length) {
            nameSearches = [this.nameSearch];
          }
          var allMatch = true;
          for(var ns=0;ns<nameSearches.length;++ns) {
            if(e.name.toUpperCase().indexOf(nameSearches[ns].toUpperCase()) == -1) {
              allMatch = false;
              break;
            }
          }
          
          if(!allMatch) {
            continue;
          }
        }
        
        if(this.stat.id >= 0) {
          var statFound = false;
          
          var statVal: any = {};
          for(var s=0;s<e.stats.length;++s) {
            var stat = e.stats[s];
            if(stat.id == this.stat.id) {
              statFound = true;
              statVal.i = curDisplay;
              statVal.s = Number(stat.max);
              break;
            }
            else if(stat.id == pcStatId) {
              statFound = true;
              statVal.i = curDisplay;
              statVal.s = Number(stat.max);
            }
            else if(stat.id == altStatId) {
              statFound = true;
              statVal.i = curDisplay;
              statVal.s = Number(stat.max);
            }
          }
          
          if(!statFound) {
            continue;
          }
          else {
            statVals.push(statVal);
          }
        }
        
        newResults.push(e);
        curDisplay++;
      }
    }
    
    if(this.stat.id >= 0) {
      
      var currentResults = Math.min(curDisplay, this.maxDisplay);
      
      statVals = statVals.sort(function(value1, value2) {
        return value2.s - value1.s;
      });
      
      var statResults = [];
      for(var i=0;i<currentResults;++i) {
        statResults.push(newResults[statVals[i].i]);
      }
      newResults = statResults;
    }
    
    this.totalNumResults = newResults.length;
    
    return newResults;
  }

  getNameSize() {
    if(this.itemCategory.hideJob && this.itemCategory.hideLevel) {
      return 'large';
    }
    if(this.itemCategory.hideJob || this.itemCategory.hideLevel) {
      return 'medium';
    }
    else if(!this.itemCategory.hideJob && !this.itemCategory.hideLevel) {
      return 'small';
    }
    else {
      return 'full';
    }
  }

  showMoreResults() {
    this.maxDisplay += 18;
    this.results = this.getResults();
  }
}
