import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-build-item',
  templateUrl: './build-item.component.html',
  styleUrls: ['./build-item.component.scss']
})
export class BuildItemComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
