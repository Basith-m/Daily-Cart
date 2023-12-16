import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path:'', component:AllProductsComponent
  },
  {
    path:'view/:id', component:ViewProductComponent
  },
  {
    path:'user/login', component:LoginComponent
  },
  {
    path:'user/register', component:RegisterComponent
  },
  {
    path:'user/wishlist', component:WishlistComponent
  },
  {
    path:'user/cart', component:CartComponent
  },
  {
    path:'user/checkout', component:CheckoutComponent
  },
  {
    path:'**',redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
