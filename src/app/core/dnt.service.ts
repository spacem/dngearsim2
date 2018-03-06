import { Injectable } from '@angular/core';
import { DntReader } from './dnt-reader';
import { Subject } from 'rxjs/Subject';
import { Region, RegionService } from './region.service';
import { LoadingService } from './loading.service';

class DntLoader {

  constructor(
    private loadingService: LoadingService,
    private loadSubject: Subject<string>,
    private dntLocation: any,
    private file: string) {
  }

  reader = new DntReader();

  loaded = false;
  startedLoading = false;
  failed = false;

  init() {
    if (this.loaded) {
      return Promise.resolve();
    }
    else {
      if (!this.startedLoading) {

        if (this.dntLocation &&
          this.dntLocation.url &&
          this.dntLocation.url.length) {

          this.startedLoading = true;

          this.loadSubject.next('DNTDATA_LOAD_EVENT');

          this.loadingService.addFile(this.file);
          return this.reader.loadDntFromServerFile(
            this.dntLocation.url + '/' + this.file).then(() => {
              this.loadSubject.next('DNTDATA_LOAD_EVENT');
              this.loaded = true;
              this.loadingService.finishFile(this.file);
            }).catch(() => {
              this.loaded = true;
              this.failed = true;
              console.log('ignoring the error - this file may not exist yet for the region');
              this.loadSubject.next('DNTDATA_LOAD_EVENT');
              this.loadingService.finishFile(this.file);
            });
        }
      }
    }
  }

  reset() {
    this.reader = new DntReader();
    this.loaded = false;
    this.startedLoading = false;
  }
}

@Injectable()
export class DntService {

  loadSubject: Subject<string> = new Subject();
  loaders: {[fileName: string]: DntLoader} = {};
  findIndexes: any = {};

  constructor(
    private loadingService: LoadingService,
    private regionService: RegionService
  ) {
    regionService.regionChangeSubject.subscribe(() => {
      this.resetAll();
    });
  }

  init(fileName: string): Promise<any> {
    if (!(fileName in this.loaders)) {
      if (fileName.length > 0) {
        this.loaders[fileName] = new DntLoader(this.loadingService, this.loadSubject, this.regionService.dntLocation, fileName);
      }
    }
    return this.loaders[fileName].init();
  }

  getData(fileName) {
    if (this.isLoaded(fileName)) {
      var reader = this.loaders[fileName].reader;
      var retVal = new Array(reader.numRows);
      for (var i = 0; i < reader.numRows; ++i) {
        retVal[i] = reader.getRow(i);
      }

      return retVal;
    }
    else {
      return [];
    }
  }
  find(fileName, column, value) {
    var results = this.findFast(fileName, column, value);
    var retVal = [];
    var numResults = results.length;
    for (var i = 0; i < numResults; ++i) {
      retVal.push(this.getRow(fileName, results[i]));
    }

    return retVal;
  }
  findFast(fileName, column, value) {

    if (this.isLoaded(fileName)) {
      if (!(fileName in this.findIndexes)) {
        this.findIndexes[fileName] = {};
      }

      var reader = this.loaders[fileName].reader;
      var colIndex = reader.columnIndexes[column];

      var findIndex = this.findIndexes[fileName];

      if (!(column in findIndex)) {
        var index = {}
        findIndex[column] = index;

        var data = reader.data;
        var len = data.length;
        for (var r = 0; r < len; ++r) {
          var val = data[r][colIndex];

          if (!(val in index)) {
            index[val] = [r];
          }
          else {
            index[val].push(r);
          }
        }
      }

      if (value in findIndex[column]) {
        if (Array.isArray(findIndex[column][value])) {
          return findIndex[column][value];
        }
        else {
          return [findIndex[column][value]];
        }
      }
      else {
        return [];
      }
    }
    else {
      console.log('cannot find fast - not loaded');
    }

    return [];
  }
  isLoaded(fileName) {
    return fileName in this.loaders && this.loaders[fileName].loaded;
  }
  hasFailed(fileName) {
    return fileName in this.loaders && this.loaders[fileName].failed;
  }
  hasStartedLoading(fileName) {
    return this.isLoaded(fileName) || (fileName in this.loaders && this.loaders[fileName].startedLoading);
  }
  reset(fileName) {
    if (fileName in this.loaders) {
      this.loaders[fileName].reset();
      delete this.loaders[fileName];
      delete this.findIndexes[fileName];
    }
  }
  resetAll() {
    var t = this;
    for (let key of Object.keys(this.loaders)) {
      t.reset(key);
    }
  }
  anyLoading() {
    var found = 0;
    for (let key of Object.keys(this.loaders)) {
      const value = this.loaders[key];
      if (!value.loaded && value.startedLoading) {
        found++;
      }
    }

    return found;
  }
  getNumRows(fileName) {
    if (this.isLoaded(fileName)) {
      return this.loaders[fileName].reader.numRows;
    }
    else {
      return 0;
    }
  }

  getRow(fileName, index): any {
    if (this.isLoaded(fileName)) {
      return this.loaders[fileName].reader.getRow(index);
    }
    else {
      return {};
    }
  }

  lookupValue(fileName, data, columnName) {
    if (this.isLoaded(fileName)) {
      return data[this.loaders[fileName].reader.columnNames[columnName]];
    }
    else {
      return null;
    }
  }
  convertData(fileName, data) {
    if (this.isLoaded(fileName)) {
      return this.loaders[fileName].reader.convertData(data);
    }
    else {
      return null;
    }
  }

  getValue(fileName, index, columnName) {
    if (this.isLoaded(fileName)) {
      return this.loaders[fileName].reader.getValue(index, columnName);
    }
    else {
      return null;
    }
  }
}
