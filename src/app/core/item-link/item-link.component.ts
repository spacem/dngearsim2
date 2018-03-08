import { Component, OnInit, Input } from '@angular/core';
import { RegionService } from '../region.service';
import { ExportLinkService } from '../export-link.service';

@Component({
  selector: 'app-item-link',
  templateUrl: './item-link.component.html',
  styleUrls: ['./item-link.component.scss']
})
export class ItemLinkComponent implements OnInit {

  @Input() item: any;

  get itemLink() {
    if (this.regionService.dntLocation) {
      return '/' + this.regionService.dntLocation.region + '/item/' + this.exportLinkService.encodeItem(this.item);
    }
  }

  constructor(
    private regionService: RegionService,
    private exportLinkService: ExportLinkService) { }

  ngOnInit() {
  }

}
