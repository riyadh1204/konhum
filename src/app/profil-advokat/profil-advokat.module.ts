import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilAdvokatPageRoutingModule } from './profil-advokat-routing.module';

import { ProfilAdvokatPage } from './profil-advokat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilAdvokatPageRoutingModule
  ],
  declarations: [ProfilAdvokatPage]
})
export class ProfilAdvokatPageModule {}
