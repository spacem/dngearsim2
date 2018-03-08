import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-edit-skill',
  templateUrl: './item-edit-skill.component.html',
  styleUrls: ['./item-edit-skill.component.scss']
})
export class ItemEditSkillComponent implements OnInit {

  @Input() item: any;
  @Output() itemChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
