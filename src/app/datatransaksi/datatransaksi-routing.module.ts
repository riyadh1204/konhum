import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatatransaksiPage } from './datatransaksi.page';

const routes: Routes = [
  {
    path: '',
    component: DatatransaksiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatransaksiPageRoutingModule {}
