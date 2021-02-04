import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulationsPage } from './postulations.page';

const routes: Routes = [
  {
    path: '',
    component: PostulationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulationsPageRoutingModule {}
