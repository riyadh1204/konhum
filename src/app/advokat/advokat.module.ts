import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvokatPageRoutingModule } from './advokat-routing.module';

import { AdvokatPage } from './advokat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvokatPageRoutingModule
  ],
  declarations: [AdvokatPage]
})
export class AdvokatPageModule {}
