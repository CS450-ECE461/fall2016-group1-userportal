'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'resgister',
  template: `
    <p>Register<p>
    <a uiSref="main">Home</a>
    <a uiSref="login">Login</a>
  `
})
export class RegisterComponent {}
