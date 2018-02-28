import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegionService } from '../core/region.service';
import { SaveService } from '../core/save.service';
import { TranslationService } from '../core/translation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  regionSubScription: Subscription;
  savedItems: any;
  simError: null;
  noLocationMenu = [];
  searchAction = { path: 'search', name: 'search', icon: 'search' };
  buildsAction = { path: 'builds', name: 'builds', icon: 'menu-hamburger' };
  buildAction = { path: 'build', name: 'build', build: null };

  normalMenu = [
    this.buildsAction,
    this.searchAction
  ];

  withBuildMenu = [
    this.buildsAction,
    this.searchAction,
    this.buildAction,
  ];

  constructor(
    private regionService: RegionService,
    private saveService: SaveService,
    private translationService: TranslationService) { }

  async ngOnInit() {
    await this.regionService.init();
    this.regionSubScription = this.regionService.regionChangeSubject.subscribe(() => {
      this.setupActions();
    });
    this.setupActions();
  }

  ngOnDestroy() {
    if (this.regionSubScription) {
      this.regionSubScription.unsubscribe();
    }
  }

  setupActions() {
    this.searchAction.path = this.regionService.dntLocation.region + '/search';
  }

  isSearch() {
    return window.location.pathname.indexOf('/search') > -1;
  }

  isLoading() {
    return this.translationService.startedLoading &&
      !this.translationService.isLoaded() &&
      this.regionService.tLocation != null &&
      this.regionService.tLocation.url != '' &&
      !this.noRegion();
  }

  noRegion() {
    return this.regionService.dntLocation == null;
  }

  isHttpOnly() {
    return location.protocol != 'https:' && location.hostname != 'localhost';
  }

  getActions() {
    try {
      var menu = null;

      var currentBuild = this.saveService.getCurrentBuild();
      if (currentBuild) {
        if (!this.savedItems || !(currentBuild in this.savedItems)) {
          // console.log('loading saved items');
          this.savedItems = this.saveService.getSavedItems();
        }

        if (!(currentBuild in this.savedItems)) {
          currentBuild = null;
        }
      }

      if (this.regionService.dntLocation != null && this.regionService.dntLocation.url == '') {
        menu = this.noLocationMenu;
      }
      else if (this.regionService.tLocation != null && this.regionService.tLocation.url == '') {
        menu = this.noLocationMenu;
      }
      else if (currentBuild && currentBuild != 'null') {
        menu = this.withBuildMenu;
        this.buildAction.path = 'build?buildName=' + currentBuild;
        this.buildAction.name = currentBuild;
        if (currentBuild in this.savedItems) {
          this.buildAction.build = this.savedItems[currentBuild];
        }
      }
      else if (window.location.pathname == '/view-group' || this.regionService.dntLocation == null) {
        menu = this.normalMenu;
      }
      else {
        menu = this.normalMenu;
      }

      var path = window.location.pathname;
      menu.forEach(value => {
        delete value.extraCss;
        if (path && path.length == 1) {
          if (value.path.length == 1) {
            value.extraCss = 'active';
          }
        }
        else if (value.path && value.path.length > 1 && path.indexOf('/' + value.path) == 0) {
          if (value.path != 'builds' || path == '/builds') {
            value.extraCss = 'active';
          }
        }
      });

      return menu;
    }
    catch (ex) {
      this.simError = ex.message;
      console.error(ex);
    }
  }

}
