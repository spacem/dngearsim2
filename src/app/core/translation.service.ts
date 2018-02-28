import { Injectable } from '@angular/core';
import { RegionService } from './region.service';
import { Observable } from 'rxjs/Observable';
import { decompressFromUTF16 } from 'lz-string';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';

const smallFile = 'uistring.optimised.lzjson';
const bigFile = 'uistring.lzjson';

@Injectable()
export class TranslationService {

  private data: any;
  private loading: any;

  constructor(
    private http: HttpClient,
    private regionService: RegionService,
    private loadingService: LoadingService
  ) { }

  init(): Promise<any> {
    if (this.loaded) {
      return Promise.resolve();
    }

    const url = this.regionService.tLocation.url + '/uistring.lzjson';
    let observable: Observable<string>;
    if (sessionStorage.getItem('UIStrings_file') === url) {
      observable = Observable.of(sessionStorage.getItem('UIStrings'));
    } else {
      observable = this.http.get(url, { responseType: 'text' });
      observable = this.loadingService.subscribe('uistring.lzjson', observable);
    }
    observable = observable.do(data => {
      sessionStorage.setItem('UIStrings', data);
      this.setupData(data);
    });

    return observable.toPromise().then(() => this.loaded = true);
  }

  private setupData(data: any) {
    const stringifiedData = decompressFromUTF16(data);
    this.data = JSON.parse(stringifiedData);
  }

  getRawData() {
    return this.data;
  }

  reset() {
    this.loaded = false;
    this.startedLoading = false;
  }

  getFileName() {
    if (this.small) {
      // console.log('loading optimised this.translationService');
      return smallFile;
    }
    else {
      // console.log('loading full this.translationService');
      return bigFile;
    }
  }

  loaded = false;
  startedLoading = false;
  small = false;

  location: any = null;
  region: any = null;

  isLoaded() {
    if (!this.loaded) {
      var fileName = this.location + '/' + this.getFileName();

      if (fileName != localStorage.getItem("UIStrings_file")) {
        sessionStorage.removeItem('UIStrings');
        localStorage.removeItem('UIStrings_file');
      }
      /*
            this.loaded = dnTranslations.loadFromSession();
            if(this.loaded) {
              uiTranslations.addTranslations(this.region, this.getRawData());
              $translate.use(this.region);
              this.startedLoading = true;
            }
      */
    }
    return this.loaded;
  }

  translate(id: string, idParam?: string) {
    return this.fullTranslate(id, idParam);
  }


  fullTranslate(id: string, idParam: string) {
    if (this.data) {
      try {
        let name;
        if (!id) {
          return '';
        } else {
          name = this.simpleTranslate(id);

          if (typeof name !== 'string') {
            return 'm' + name;
          }
        }

        if (idParam && name) {
          if (typeof idParam === 'string') {
            const params = idParam.split(',');
            for (let p = 0; p < params.length; ++p) {
              let pid = params[p];
              if (pid.indexOf('{') === 0) {
                pid = params[p].replace(/\{|\}/g, '');
                pid = this.simpleTranslate(pid);
              }

              name = name.replace('{' + p + '}', pid);
            }
          } else {
            name = name.replace('{0}', idParam);
          }
        }

        return name;
      } catch (ex) {
        console.log('unable to translate', id, idParam, ex);
      }
    }

    return 'm' + id;
  }

  simpleTranslate(value: any) {
    if (!this.data) {
      return value;
    }
    let result = '';

    if (value === 0 || value === '' || value === null) {
      result = value;
    } else if (value.toString().indexOf(',') > -1 && value.toString().indexOf('{') > -1) {
      const values = value.toString().split(',');

      const results = [];
      for (let v = 0; v < values.length; ++v) {
        if (values[v].indexOf('{') === 0) {
          const stripped = values[v].replace('{', '').replace('}', '');
          results.push(values[v].replace(stripped, this.simpleTranslate(stripped)));
        } else {
          results.push(values[v]);
        }
      }

      result = results.join(',');
    } else {
      result = this.data[value];
      if (typeof result === 'undefined') {
        if (typeof value === 'string') {
          if (value.indexOf('{') === 0) {
            const stripped = value.replace('{', '').replace('}', '');
            result = value.replace(stripped, this.simpleTranslate(stripped));
          } else {
            result = value.toString();
          }
        } else {
          result = value;
        }
      } else if (typeof value === 'string' && result.indexOf('#N/A') === 0) {
        result = '';
      }
    }

    return result;
  }
}