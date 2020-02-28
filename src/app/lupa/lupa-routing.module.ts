import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LupaPage } from './lupa.page';

const routes: Routes = [
  {
    path: '',
    component: LupaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LupaPageRoutingModule {}
