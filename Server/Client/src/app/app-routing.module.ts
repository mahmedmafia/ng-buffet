import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UserComponent } from './components/user/user.component';
import { CanLoginGuard } from './components/auth/can-login.guard';
import { CartComponent } from './components/cart/cart.component';
import { ProductNewComponent } from './components/product/product-new/product-new.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: LandingpageComponent },
  { path: 'products', component: ProductComponent },

  // { path: 'authors', component: AuthorsComponent },

  // { path: 'authors/new', component: NewAuthorComponent },

  { path: 'products/new', component: ProductNewComponent,canActivate:[CanLoginGuard] },

  // { path: 'books/:id', component: BookDetailsComponent },
  { path: 'user', component: AuthComponent },
  {path:'cart',component:CartComponent},
  {path:'user/:id',component:UserComponent},

  {path:'user/:id/edit',component:EditUserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
