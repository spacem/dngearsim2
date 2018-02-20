import { Injectable } from '@angular/core';
import { ExportLinkService } from '../core/export-link.service';

@Injectable()
export class BuildService {

  constructor(
    private exportLinkService: ExportLinkService
  ) {}

  reloadGroup(groupName: string, group: any) {
    var newItems = [];
    group.items.forEach(item => {
      var newItem = this.exportLinkService.reloadItem(item);
      if(newItem) {
        newItems.push(newItem);
      }
    });
    
    return newItems;
  }
  
  getDntFiles(group: any) {

    var allDntFiles = {};
    group.items.forEach(item => {
      
      var dntFiles = this.exportLinkService.getDntFiles(item);
      for(let key of Object.keys(dntFiles)) {
        allDntFiles[key] = dntFiles[key];
      }
    });
    
    return allDntFiles;
  }
}
