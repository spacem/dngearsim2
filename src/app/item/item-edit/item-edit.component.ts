import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onUpdateItem() {
    this.itemChange.emit();
  }
}
