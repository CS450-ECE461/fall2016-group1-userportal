'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'main',
  template: `
    <h2>Welcome to Prattle</h2>
    <a uiSref="login">Login</a>
    <a uiSref="register">Register</a>
  `
})
export class MainComponent {}
