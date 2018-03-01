import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TranslationServiceStub {
}

@Injectable()
export class DntServiceStub {
}

@Injectable()
export class ItemFactoryServiceStub {
}

@Injectable()
export class RegionServiceStub {
  regionChangeSubject = new Subject();
  dntLocation = null;
  getOverride() {
  }
  async init() {
  }
}

@Injectable()
export class ExportLinkServiceStub {
  encodeItem() {
  }
}

@Injectable()
export class ItemSourceServiceStub {
  sources: any = {};
}

@Injectable()
export class TranslateServiceStub {
  async init() {
  }

  get() {
  }
}

@Injectable()
export class JobServiceStub {
  async init() {
  }
}

@Injectable()
export class ItemCategoryServiceStub {
  async init() {
  }

  byName() {
    return {};
  }
}

@Injectable()
export class SaveServiceStub {
  getSavedItems() {
    return {};
  }
  getCurrentBuild() {
  }
}

@Injectable()
export class QuickAddHelperServiceStub {
}

@Injectable()
export class QuickAddStepsServiceStub {
}

@Injectable()
export class LoadingServiceStub {
  loadingSubject = new Subject();
  getLoadingString() {
  }

  isLoading() {
  }

  hadError() {
  }
}

@Injectable()
export class HttpClientStub {
  get(url: string, options: any) {
    return Observable.of();
  }

  post(url: string, options: any) {
    return Observable.of();
  }
}
