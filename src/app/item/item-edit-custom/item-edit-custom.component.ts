import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-edit-custom',
  templateUrl: './item-edit-custom.component.html',
  styleUrls: ['./item-edit-custom.component.scss']
})
export class ItemEditCustomComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
