'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var RegisterComponent = (function () {
    function RegisterComponent() {
    }
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'resgister',
            template: "\n\n    <h2>Register</h2>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-sm-6 col-sm-offset-4\">\n          <form>\n            <div class=\"form-group\">\n              <label for=\"id\">Username*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"text\" class=\"form-control\" id=\"id\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"firstName\">First Name*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"text\" class=\"form-control\" id=\"firstName\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"middleName\">Middle Name</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"text\" class=\"form-control\" id=\"middleName\">\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"lastName\">Last Name*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"text\" class=\"form-control\" id=\"lastName\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"emailAddress\">Email*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"email\" class=\"form-control\" id=\"emailAddress\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"password\">Password*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"password\" class=\"form-control\" id=\"password\" required>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"confirmPassword\">Confirm Password*</label>\n              <div class =\"row\">\n                <div class=\"col-xs-12 col-md-7\">\n                  <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" required>\n                </div>\n              </div>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n          </form>\n        </div>\n    </div>\n    <br/>\n    <a uiSref=\"main\">Home</a>\n    <a uiSref=\"login\">Login</a>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map