'use strict';
import { NgModule, Component } from '@angular/core';
// import { StateService } from 'ui-router-ng2';

//<ui-view></ui-view>
@Component({
  selector: 'app',
  template: `
    <div class ="container">
      <ui-view></ui-view>
    </div>
  `
})
export class AppComponent {}
