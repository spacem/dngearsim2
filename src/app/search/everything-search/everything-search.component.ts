import { Component, OnInit } from '@angular/core';
import { DntService } from '../../core/dnt.service';
import { TranslationService } from '../../core/translation.service';
import { ValuesService } from '../../core/values.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-everything-search',
  templateUrl: './everything-search.component.html',
  styleUrls: ['./everything-search.component.scss']
})
export class EverythingSearchComponent implements OnInit {
  
  everything: any[] = null;
  maxDisplay = 32;
  currentResults = 0;
  results: any[] = null;
  minLevel = 1;
  maxLevel = 99;
  version = 'all';
  versions = [this.version];
  totalNumResults = 0;
  origMaxLevel: any;
  origMinLevel: any;
  nameSearch = '';
  fileName = 'all-items.lzjson';

  constructor(
    private dntService: DntService,
    private translationService: TranslationService,
    private valuesService: ValuesService
  ) {
    var minLevel = Number(localStorage.getItem('minLevel'));
    // if($routeParams.minLevel) {
    //   minLevel = Number($routeParams.minLevel);
    // }
    if(minLevel > 0 && minLevel < 100) {
      minLevel = minLevel;
    }
    this.origMinLevel = minLevel;
    
    var maxLevel = Number(localStorage.getItem('maxLevel'));
    // if($routeParams.maxLevel) {
    //   maxLevel = Number($routeParams.maxLevel);
    // }
    if(maxLevel > 0 && maxLevel < 100) {
      maxLevel = maxLevel;
    }
    this.origMaxLevel = maxLevel;
  
    if(!this.nameSearch) {
      this.nameSearch = localStorage.getItem('nameSearch');
      // if($routeParams.name) {
      //   this.nameSearch = $routeParams.name;
      // }
      if(this.nameSearch == null) {
        this.nameSearch = '';
      }
    }
  }

  async ngOnInit() {
    await Promise.all([
      this.dntService.init(this.fileName),
      this.translationService.init()]);
    this.initeverything();
  }
  
  initeverything() {
    console.log('about to init', this.everything, this.dntService.isLoaded(this.fileName), this.translationService.isLoaded());
    if(this.dntService.isLoaded(this.fileName) && this.translationService.isLoaded() && !this.everything) {
      this.everything = [];
      
      var versionMap = {};
      var datas = this.dntService.getData(this.fileName);
      console.log(datas.length + ' everything');
      for(var i=0;i<datas.length;++i) {
        var data = datas[i];
        if(data.NameID > 0) {
          var item = {
            id: data.id,
            name: this.translationService.translate(data.NameID, data.NameIDParam),
            rank: this.valuesService.rankNames[data.Rank],
            icon: data.IconImageIndex,
            levelLimit: data.LevelLimit,
            fileName: data.fileName,
            version: data.version
          }
          this.everything.push(item);

          if(data.version) {
            versionMap[data.version] = true;
          }
        }
      }

      for(var version in versionMap) {
        this.versions.push(version);
      }
      
      this.everything = _.sortBy(this.everything, 'name');
      this.showMoreResults();
    }
  }
  
  getResults() {
    if(this.everything == null) {
      this.initeverything();
    }
    
    if(this.everything == null) {
      return [];
    }

    var newResults = [];
    var numeverything = this.everything.length;
    var curDisplay = 0;
    for(var i=0;i<numeverything && (curDisplay<this.maxDisplay);++i) {
      var e = this.everything[i];

      if(e.levelLimit < this.minLevel || e.levelLimit > this.maxLevel || (!e.levelLimit)) {
        continue;
      }

      if(this.version != 'all' && this.version != e.version) {
        continue;
      }

      if(this.nameSearch != '') {
        var nameSearches = this.nameSearch.split(' ');
        if(nameSearches.length == 0) {
          nameSearches = [this.nameSearch];
        }
        var allMatch = true;
        for(var ns=0;ns<nameSearches.length;++ns) {
          if(e.name && e.name.toString().toUpperCase().indexOf(nameSearches[ns].toUpperCase()) == -1) {
            allMatch = false;
            break;
          }
        }
        
        if(!allMatch) {
          continue;
        }
      }
      
      newResults.push(e);
      curDisplay++;
    }
    
    this.totalNumResults = newResults.length;
    return newResults;
  }
  
  changeSearch() {
    if(this.minLevel != this.origMinLevel) {
      localStorage.setItem('minLevel', this.minLevel.toString());
      //$location.search('minLevel', minLevel);
      this.origMinLevel = this.minLevel;
    }
    
    if(this.maxLevel != this.origMaxLevel) {
      localStorage.setItem('maxLevel', this.maxLevel.toString());
      // $location.search('maxLevel', maxLevel);
      this.origMaxLevel = this.maxLevel;
    }

    localStorage.setItem('nameSearch', this.nameSearch);
    // $location.search('name', nameSearch);
    
    this.maxDisplay = 64;
    this.results = this.getResults();
  }

  showMoreResults() {
    // console.log('show more', maxDisplay);
    this.maxDisplay += 18;
    this.results = this.getResults();
  }
}

