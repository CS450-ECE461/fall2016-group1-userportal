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
var core_1 = require("@angular/core");
var LoginComponent = (function () {
    function LoginComponent() {
    }
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        template: "\n  <h2>Login</h2>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-sm-6 col-sm-offset-4\">\n        <form>\n          <div class=\"form-group\">\n            <label for=\"emailAddress\">Email*</label>\n            <div class =\"row\">\n              <div class=\"col-xs-12 col-md-7\">\n                <input type=\"email\" class=\"form-control\" id=\"emailAddress\" required>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label for=\"password\">Password*</label>\n            <div class =\"row\">\n              <div class=\"col-xs-12 col-md-7\">\n                <input type=\"password\" class=\"form-control\" id=\"password\" required>\n              </div>\n            </div>\n          </div>\n          <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n        </form>\n      </div>\n  </div>\n  <br/>\n  <a uiSref=\"main\">Home</a>\n  <a uiSref=\"register\">Register</a>\n</div>\n\n  "
    }),
    __metadata("design:paramtypes", [])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map