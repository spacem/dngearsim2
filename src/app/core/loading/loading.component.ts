import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  message: string;
  loadingSubscription: Subscription;

  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
    this.message = this.loadingService.getLoadingString();
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
