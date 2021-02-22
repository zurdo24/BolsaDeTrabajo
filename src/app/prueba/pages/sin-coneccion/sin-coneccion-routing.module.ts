import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinConeccionPage } from './sin-coneccion.page';

const routes: Routes = [
  {
    path: '',
    component: SinConeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinConeccionPageRoutingModule {}
