import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'play', component: MapComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset password', component: InventoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
