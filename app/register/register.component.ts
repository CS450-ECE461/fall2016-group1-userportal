'use strict';
import { Component } from '@angular/core';
import { StateService } from 'ui-router-ng2';


@Component({
  selector: 'resgister',
  template: `

    <p>Register<p>
    <form>
      <div class="form-group">
        <label for="id">Username*</label>
        <div class ="row">
          <div class="col-xs-12 col-md-3">
            <input type="text" class="form-control" id="id" required>
          </div>
          <div class="col-md-9"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="firstName">First  Name*</label>
        <div class ="row">
          <div class=" col-xs-12 col-md-3">
            <input type="text" class="form-control" id="firstName" required>
          </div>
          <div class="col-md-9"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="middleName">Middle Name</label>
        <div class ="row">
          <div class="col-xs-12 col-md-3">
            <input type="text" class="form-control" id="middleName">
          </div>
          <div class="col-md-9"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name*</label>
        <div class ="row">
          <div class=" col-xs-12 col-md-3">
            <input type="text" class="form-control" id="lastName" required>
          </div>
          <div class="col-md-9"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="emailAddress">Email*</label>
        <div class ="row">
          <div class="col-xs-12 col-md-3">
            <input type="text" class="form-control" id="emailAddress" required>
          </div>
          <div class="col-md-9"></div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <br/>
    <a uiSref="main">Home</a>
    <a uiSref="login">Login</a>
  `
})
export class RegisterComponent {}
