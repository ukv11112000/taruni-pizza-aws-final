import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoupanComponent } from './coupan/coupan.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderComponent } from './order/order.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { PizzaComponent } from './pizzas/pizza/pizza.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { EditComponent } from './register/edit/edit.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  // Public pages
  { path: 'pizza', component: PizzasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Logged-in user pages
  { path: 'pizzaorder', component: PizzaOrderComponent },
  { path: 'user/edit', component: EditComponent },
  { path: 'orderhistory', component: OrderComponent },

  // Admin pages
  { path: 'pizza/add', component: PizzaComponent },
  { path: 'coupon', component: CoupanComponent },
  { path: 'customers', component: CustomersComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  PizzaComponent,
  PizzasComponent,
  NavbarComponent,
  PizzaOrderComponent
];
