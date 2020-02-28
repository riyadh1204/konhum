import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatmsgPage } from './chatmsg.page';

const routes: Routes = [
  {
    path: '',
    component: ChatmsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatmsgPageRoutingModule {}
