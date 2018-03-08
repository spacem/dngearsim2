import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-edit-potential',
  templateUrl: './item-edit-potential.component.html',
  styleUrls: ['./item-edit-potential.component.scss']
})
export class ItemEditPotentialComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
