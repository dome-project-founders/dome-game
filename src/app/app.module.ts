import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaInfoComponent } from './area-info/area-info.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LootDialogComponent } from './loot-dialog/loot-dialog.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemBoxComponent } from './item-box/item-box.component';
import { ItemInventoryInfoComponent } from './item-inventory-info/item-inventory-info.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule({
  declarations: [
    AppComponent,
    AreaInfoComponent,
    MapComponent,
    HeaderComponent,
    LoginComponent,
    LootDialogComponent,
    InventoryComponent,
    ItemBoxComponent,
    ItemInventoryInfoComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    MatDialog
  ],
  entryComponents: [LootDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
