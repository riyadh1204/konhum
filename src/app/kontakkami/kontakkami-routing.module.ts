import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KontakkamiPage } from './kontakkami.page';

const routes: Routes = [
  {
    path: '',
    component: KontakkamiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KontakkamiPageRoutingModule {}
