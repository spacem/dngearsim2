import { Component, OnInit } from '@angular/core';
import { SaveService } from '../../core/save.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  builds: any[];
  buildNames: string[];
  savedItems: any;
  constructor(
    private saveService: SaveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupBuilds();
  }

  setupBuilds() {
    this.savedItems = this.saveService.getSavedItems();
    this.buildNames = Object.keys(this.savedItems).sort();
    this.builds = this.buildNames.map(n => {
      return {
        name: n,
        build: this.savedItems[n]
      }
    });
  }

  anyItems() {
    return Object.keys(this.savedItems).length > 0;
  }

  handleChange() {
    this.setupBuilds();
  }

  toggleGroup(buildName) {
    this.saveService.saveBuildSelection(buildName, this.savedItems);
    this.router.navigate(['/builds/' + buildName]);
  }
  
  publish() {
    this.router.navigate(['/online/publish']);
  }
  
  search() {
    this.router.navigate(['/online/build-search']);
  }

  createGroup() {
    this.router.navigate(['/builds/new-build']);
  }
}
