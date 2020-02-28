import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahdatadiriPage } from './ubahdatadiri.page';

const routes: Routes = [
  {
    path: '',
    component: UbahdatadiriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahdatadiriPageRoutingModule {}
