import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivechatPageRoutingModule } from './livechat-routing.module';

import { LivechatPage } from './livechat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivechatPageRoutingModule
  ],
  declarations: [LivechatPage]
})
export class LivechatPageModule {}
