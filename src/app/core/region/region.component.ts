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
  dntLocation: any;

  async ngOnInit() {
    await this.regionService.init();
    this.setDntVersion();

    this.dntLocation = this.regionService.dntLocation;
    this.regionService.regionChangeSubject.subscribe(r => {
      this.dntLocation = this.regionService.dntLocation;
    });
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

    this.regionService.setLocation(location);
    this.edit = false;
    this.setDntVersion();
  }
  
  setOverride(value) {
    this.regionService.setOverride(value);
    this.override = value;
    this.edit = value;
  }

}
