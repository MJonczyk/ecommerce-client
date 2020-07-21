import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterConfirmationComponent } from './component/register-confirmation/register-confirmation.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerConfirmation', component: RegisterConfirmationComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'addCategory', component: AddCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
