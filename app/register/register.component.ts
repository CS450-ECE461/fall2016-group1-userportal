'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'resgister',
  template: `

    <h2>Register</h2>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-4">
          <form>
            <div class="form-group">
              <label for="id">Username*</label>
              <div class ="row">
                <div class="col-xs-12 col-md-7">
                  <input type="text" class="form-control" id="id" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="firstName">First Name*</label>
              <div class ="row">
                <div class="col-xs-12 col-md-7">
                  <input type="text" class="form-control" id="firstName" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="middleName">Middle Name</label>
              <div class ="row">
                <div class="col-xs-12 col-md-7">
                  <input type="text" class="form-control" id="middleName">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name*</label>
              <div class ="row">
                <div class="col-xs-12 col-md-7">
                  <input type="text" class="form-control" id="lastName" required>
                </div>
              </div>
            </div>
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
            <div class="form-group">
              <label for="confirmPassword">Confirm Password*</label>
              <div class ="row">
                <div class="col-xs-12 col-md-7">
                  <input type="password" class="form-control" id="confirmPassword" required>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
    </div>
    <br/>
    <a uiSref="main">Home</a>
    <a uiSref="login">Login</a>
  </div>
  `
})
export class RegisterComponent {}
