import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatatransaksiPageRoutingModule } from './datatransaksi-routing.module';

import { DatatransaksiPage } from './datatransaksi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatatransaksiPageRoutingModule
  ],
  declarations: [DatatransaksiPage]
})
export class DatatransaksiPageModule {}
