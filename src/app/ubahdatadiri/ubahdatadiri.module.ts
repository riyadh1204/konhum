import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahdatadiriPageRoutingModule } from './ubahdatadiri-routing.module';

import { UbahdatadiriPage } from './ubahdatadiri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UbahdatadiriPageRoutingModule
  ],
  declarations: [UbahdatadiriPage]
})
export class UbahdatadiriPageModule {}
