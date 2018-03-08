import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-edit-spark',
  templateUrl: './item-edit-spark.component.html',
  styleUrls: ['./item-edit-spark.component.scss']
})
export class ItemEditSparkComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
