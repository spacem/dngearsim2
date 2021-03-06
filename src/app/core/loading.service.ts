import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  loadingFiles: string[] = [];
  errors: string[] = [];
  loadingSubject = new Subject<string>();

  constructor() {
  }

  isLoading() {
    return this.loadingFiles.length > 0 || this.errors.length > 0;
  }

  hadError() {
    return this.errors.length > 0;
  }

  clearErrors() {
    return this.errors = [];
  }

  getLoadingString() {
    if (this.errors.length) {
      return 'error: ' + this.errors.join(', ');
    } else {
      return 'loading files: ' + this.loadingFiles.join(', ');
    }
  }

  subscribe(fileName: string, observable: Observable<string>) {
    this.addFile(fileName);

    observable = observable.catch((err, caught) => {
      this.loadingFiles = this.loadingFiles.filter(f => f !== fileName);
      this.errors.push(err.message);
      return Observable.of('');
    });

    return observable.do(event => {
      this.finishFile(fileName);
    });
  }

  addFile(fileName: string) {
    this.loadingFiles.push(fileName);
    this.loadingSubject.next(this.getLoadingString());
  }

  finishFile(fileName: string) {
    this.loadingFiles = this.loadingFiles.filter(f => f !== fileName);
    this.loadingSubject.next(this.getLoadingString());
  }
}
