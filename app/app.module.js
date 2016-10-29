"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var main_component_1 = require('./main.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var ui_router_ng2_1 = require('ui-router-ng2');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ui_router_ng2_1.UIRouterModule.forRoot(),
                ui_router_ng2_1.UIRouterModule.forChild({
                    states: [{
                            name: 'main',
                            url: '/',
                            component: main_component_1.MainComponent
                        }, {
                            name: 'login',
                            url: '/login',
                            component: login_component_1.LoginComponent
                        }, {
                            name: 'register',
                            url: '/register',
                            component: register_component_1.RegisterComponent
                        }]
                }),
            ],
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
            ],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map