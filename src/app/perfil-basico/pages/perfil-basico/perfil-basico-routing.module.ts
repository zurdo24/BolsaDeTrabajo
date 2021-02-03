import { EditarCvComponent } from './../../components/editar-cv/editar-cv.component';
import { EditarPerfilBasicoComponent } from './../../components/editar-perfil-basico/editar-perfil-basico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilBasicoPage } from './perfil-basico.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBasicoPage
  },
  {
    path: 'editar-perfil-basico',
    component: EditarPerfilBasicoComponent
  },
  {
    path: 'editar-cv',
    component: EditarCvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBasicoPageRoutingModule {}
