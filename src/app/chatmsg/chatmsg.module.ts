import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatmsgPageRoutingModule } from './chatmsg-routing.module';

import { ChatmsgPage } from './chatmsg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatmsgPageRoutingModule
  ],
  declarations: [ChatmsgPage]
})
export class ChatmsgPageModule {}
