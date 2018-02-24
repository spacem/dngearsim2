import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-build-summary',
  templateUrl: './build-summary.component.html',
  styleUrls: ['./build-summary.component.scss']
})
export class BuildSummaryComponent implements OnInit {

  @Input() buildName: string;
  @Input() build: any;

  constructor() { }

  ngOnInit() {
  }

}
