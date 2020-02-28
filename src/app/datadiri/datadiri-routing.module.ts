import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatadiriPage } from './datadiri.page';

const routes: Routes = [
  {
    path: '',
    component: DatadiriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatadiriPageRoutingModule {}
