import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../translation.service';
import { RegionService } from '../region.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  constructor(
    private translationService: TranslationService,
    private regionService: RegionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
  }

  override = this.regionService.getOverride();

  tHoverLocation = this.regionService.tLocation;
  hoverLocation = this.regionService.dntLocation;
  edit = (this.regionService.dntLocation == null);
  dntVersion = '';

  ngOnInit() {
    this.regionService.init();
    this.translationService.init();
    this.setDntVersion();
  }
  
  setDntVersion() {
    // console.log('setting version for ', this.region.dntLocation);
    if(this.regionService.dntLocation && this.regionService.dntLocation.url) {
      this.http.get(this.regionService.dntLocation.url + '/Version.cfg', { responseType: 'text' }).toPromise().then(res => {
        if(res) {
          var newLineDetails = res.split('\r\n');
          if(newLineDetails.length) {
            var spaceDetails = newLineDetails[0].split(' ');
            if(spaceDetails.length > 1) {
              this.dntVersion = 'v' + spaceDetails[1];
            }
          }
        }
      });
    }
  }
  
  getDntLocation() {
    return this.regionService.dntLocation;
  }
  getTlocation() {
    return this.regionService.tLocation;
  }
   
  getHostedFiles() {
    // console.log('getting hosted files');
    return this.regionService.hostedFiles;
  }
  
  setTLocation(location) {
    this.regionService.setTLocation(location);
    this.edit = false;
  }
  
  setLocation(location) {
    if(!this.override) {
      this.setTLocation(null);
    }
    
    /*
    if(!this.route.snapshot.paramMap.get('region')) {
      $routeParams.region = location.region;
      $route.updateParams($routeParams);
      $route.reload();
    }
    else {
      this.regionService.setLocation(location);
    }
    */

    this.edit = false;
    this.setDntVersion();
  }
  
  setOverride(value) {
    this.regionService.setOverride(value);
    this.override = value;
    this.edit = value;
  }

}
