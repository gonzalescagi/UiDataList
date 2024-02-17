import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ApiService } from './api.service';

@NgModule({
  providers: [
    ApiService
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() private _parent: CoreModule) {
    if (this._parent) {
      throw new Error('Core module should be injected only once');
    }
  }
}