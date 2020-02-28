import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilAdvokatPage } from './profil-advokat.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilAdvokatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilAdvokatPageRoutingModule {}
