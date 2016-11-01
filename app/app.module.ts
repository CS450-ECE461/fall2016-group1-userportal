import {APP_BASE_HREF} from '@angular/common';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UIRouterModule } from 'ui-router-ng2';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forRoot(),
    UIRouterModule.forChild({
      states: [{
        name: 'main',
        url: '/',
        component: MainComponent
      }, {
        name: 'login',
        url: '/login',
        component: LoginComponent
      } , {
        name: 'register',
        url: '/register',
        component: RegisterComponent
      }  ]
    }),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
