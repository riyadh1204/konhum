import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvokatPage } from './advokat.page';

const routes: Routes = [
  {
    path: '',
    component: AdvokatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvokatPageRoutingModule {}
