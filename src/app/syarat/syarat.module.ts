import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyaratPageRoutingModule } from './syarat-routing.module';

import { SyaratPage } from './syarat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyaratPageRoutingModule
  ],
  declarations: [SyaratPage]
})
export class SyaratPageModule {}
