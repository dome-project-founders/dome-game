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
import { InventoryComponent } from './inventory/inventory.component'

@NgModule({
  declarations: [
    AppComponent,
    AreaInfoComponent,
    MapComponent,
    HeaderComponent,
    LoginComponent,
    LootDialogComponent,
    InventoryComponent,
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
