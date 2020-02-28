import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivechatPage } from './livechat.page';

const routes: Routes = [
  {
    path: '',
    component: LivechatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivechatPageRoutingModule {}
