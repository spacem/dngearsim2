import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss']
})
export class ItemIconComponent implements OnInit {

  @Input() item: any;
  iconImage: any;
  constructor() { }

  ngOnInit() {
    this.iconImage = this.getIcon();
  }
  
  getIcon() {
    if(this.item && this.item.icon > 0) {
      var fileIndex = Math.floor(this.item.icon/200 + 1);
      
      var prefix;
      if(this.item.typeName == 'skills') {
        prefix = 'skillicon';
      }
      else {
        prefix = 'itemicon';
      }
      
      if(fileIndex > 9) {
        return prefix + fileIndex + '.png';
      }
      else {
        return prefix + '0' + fileIndex + '.png';
      }
    }
    return null;
  }
  
  getIconXPostion() {
    if(this.item && this.item.icon > 0) {
      return ((this.item.icon % 10) * 40) + 5;
    }
    return 0;
  }
  
  getIconYPostion() {
    if(this.item && this.item.icon > 0) {
      return (Math.floor((this.item.icon % 200) / 10) * 40) + 4;
    }
    return 0;
  }
}
