import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor } from './components/auth/auth.interceptor';
import { NavComponent } from './components/nav/nav.component';
import { AuthComponent } from './components/auth/auth.component';
import {LandingpageComponent} from './components/landingpage/landingpage.component';
import { ProductComponent } from './components/product/product.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { ProductNewComponent } from './components/product/product-new/product-new.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UserOrderItemComponent } from './components/user/user-order-item/user-order-item.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavComponent,
    LandingpageComponent,
    ProductComponent,
    ProductItemComponent,
    ProductNewComponent,
    UserComponent,
    CartComponent,
    CartItemComponent,
    EditUserComponent,
    UserOrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
