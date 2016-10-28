'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'login',
  template: `
    <p>Login<p>
    <a uiSref="main">Home</a>
    <a uiSref="register">Register</a>
  `
})
export class LoginComponent {}
