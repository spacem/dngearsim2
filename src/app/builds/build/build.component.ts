import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  @Input() buildName: string;
  @Input() build: any;
  @Output() buildChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
