import { Injectable } from '@angular/core';
import { DntResetService } from './dnt-reset.service';
import { TranslationService } from './translation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DntService } from './dnt.service';
import { Subject } from 'rxjs/Subject';

export interface Region {
  region: string;
  name: string;
  url: string;
}

@Injectable()
export class RegionService {

  alternativeFiles: Region = { region: 'ALT', name: 'Alternative user specified files', url: '' };
  hostedFiles: Region[] = [
    { region: 'sea', name: 'south east asia', url: 'https://seadnfiles.netlify.com/public' },
    { region: 'na', name: 'north america', url: 'https://nadnfiles.netlify.com/public' },
    { region: 'eu', name: 'europe', url: 'https://eudnfiles.netlify.com/public' },
    { region: 'th', name: 'thailand', url: 'https://thdnfiles.netlify.com/public' },
    // {region: 'vn', name: 'vietnam ', url : 'https://vndnfiles.firebaseapp.com'},
    { region: 'tw', name: 'taiwan 臺灣', url: 'https://tdnfiles.netlify.com/public' },
    // {region: 'jdn', name: 'japan 日本', url : 'https://jdnfiles-59d57.firebaseapp.com'},
    { region: 'cdn', name: 'china 中國', url: 'https://cdnfiles.netlify.com/public' },
    { region: 'kdn', name: 'korea 대한민국', url: 'https://kdnfiles.netlify.com/public' },
  ];

  dntLocation: Region;
  tLocation: Region;
  regionChangeSubject: Subject<any> = new Subject();

  constructor(
  ) {
    var dntLocationRegion = localStorage.getItem('lastDNTRegion');
    var dntLocation = null;
    if (dntLocationRegion) {
      this.hostedFiles.forEach(hostedFile => {
        if (hostedFile.region == dntLocationRegion) {
          dntLocation = hostedFile;
        }
      });
    }

    var lastTFile = localStorage.getItem('UIStrings_file');
    var tLocation = null;
    if (lastTFile) {
      this.hostedFiles.forEach(hostedFile => {
        if (hostedFile.region != this.alternativeFiles.region && lastTFile.indexOf(hostedFile.url) > -1) {
          tLocation = hostedFile;
        }
      });
    }

    if (tLocation == null) {
      tLocation = dntLocation;
    }

    this.dntLocation = dntLocation;
    this.tLocation = tLocation;
  }

  setCustomUrl(url) {
    // console.log('setting custom location');
    this.alternativeFiles.url = url;

    var newFiles = [];
    this.hostedFiles.forEach(hostedFile => {
      if (hostedFile.region !== this.alternativeFiles.region) {
        newFiles.push(hostedFile);
      }
    });

    newFiles.push(this.alternativeFiles);
    this.hostedFiles = newFiles;
    this.hostedFiles = newFiles;
  }

  setLocationByName(locationName) {
    var newLocation = null;

    this.hostedFiles.forEach(hostedFile => {
      if (hostedFile.region == locationName) {
        newLocation = hostedFile;
      }
    });

    this.setLocation(newLocation);
  }

  setLocation(location) {
    if (location && location != this.dntLocation) {
      this.dntLocation = location;
      localStorage.setItem('lastDNTRegion', location.region);
      this.regionChangeSubject.next();
    }

    var override = this.getOverride();
    if (this.tLocation == null || !override) {
      this.setTLocation(location);
    }

    this.init();
  }

  async setTLocation(location) {

    if (location != this.tLocation) {
      this.tLocation = location;
      sessionStorage.removeItem('UIStrings');
      localStorage.removeItem('UIStrings_file');
      if (location) {
        var override = this.getOverride();
      }
      this.regionChangeSubject.next();
    }
  }

  getOverride() {
    if (localStorage.getItem('tOverride')) {
      return true;
    }
    else {
      return false;
    }
  }

  setOverride(value) {
    if (!value) {
      localStorage.removeItem('tOverride');
    }
    else {
      localStorage.setItem('tOverride', '1');
    }
    this.setTLocation(this.dntLocation);
  }

  init() {
    /*
    if (this.getOverride()) {
      this.translationService.small = false;
    }
    else {
      this.tLocation = this.dntLocation;
      this.translationService.small = true;
    }

    if (this.tLocation) {
      this.translationService.location = this.tLocation.url;
      this.translationService.region = this.tLocation.region;
    }
    this.dntService.setLocation(this.dntLocation);
    */
  }
}
