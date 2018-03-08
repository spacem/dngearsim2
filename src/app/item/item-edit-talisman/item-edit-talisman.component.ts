import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-edit-talisman',
  templateUrl: './item-edit-talisman.component.html',
  styleUrls: ['./item-edit-talisman.component.scss']
})
export class ItemEditTalismanComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
