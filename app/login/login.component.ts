'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'login',
  template: `
  <h2>Login</h2>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-sm-offset-4">
        <form>
          <div class="form-group">
            <label for="emailAddress">Email*</label>
            <div class ="row">
              <div class="col-xs-12 col-md-7">
                <input type="email" class="form-control" id="emailAddress" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password*</label>
            <div class ="row">
              <div class="col-xs-12 col-md-7">
                <input type="password" class="form-control" id="password" required>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
  </div>
  <br/>
  <a uiSref="main">Home</a>
  <a uiSref="register">Register</a>
</div>

  `
})
export class LoginComponent {}
