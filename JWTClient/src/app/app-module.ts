import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Home } from './home/home';
import { ProductDetails } from './product-details/product-details';
import { ProductTable } from './product-table/product-table';
import { Products } from './products/products';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Errors } from './shared/errors/errors';
import { Activity } from './shared/activity/activity';
import { ErrorModal } from './shared/error-modal/error-modal';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    App,
    Home,
    ProductDetails,
    ProductTable,
    Products,
    Login,
    Signup,
    Errors,
    Activity,
    ErrorModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
