import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KontakkamiPageRoutingModule } from './kontakkami-routing.module';

import { KontakkamiPage } from './kontakkami.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KontakkamiPageRoutingModule
  ],
  declarations: [KontakkamiPage]
})
export class KontakkamiPageModule {}
