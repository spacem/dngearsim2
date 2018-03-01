import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-icon',
  templateUrl: './job-icon.component.html',
  styleUrls: ['./job-icon.component.scss']
})
export class JobIconComponent implements OnInit {

  @Input() item: any;
  @Input() size: string;
  @Input() small: boolean;
  iconSize: number;
  iconOffset: number;
  sizeValue: string;

  constructor() { }

  ngOnInit() {
    if (this.small) {
      this.sizeValue = '205px 205px';
      this.iconSize = 22;
      this.iconOffset = 0;
    } else {
      this.sizeValue = '410px 410px';
      this.iconSize = 44;
      this.iconOffset = 5;
    }
  }

  getIconXPostion() {
    if (this.item && this.item.d && this.item.d.JobIcon > 0) {
      return ((this.item.d.JobIcon % 9) * this.iconSize) + this.iconOffset;
    }
    return 0;
  }

  getIconYPostion() {
    if (this.item && this.item.d && this.item.d.JobIcon > 0) {
      return (Math.floor(this.item.d.JobIcon / 9) * this.iconSize) + this.iconOffset;
    }
    return 0;
  }

}
