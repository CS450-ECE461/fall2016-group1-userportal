'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'main',
  template: `
    <p>main<p>
    <a uiSref="login">Login</a>
  `
})
export class MainComponent {}
