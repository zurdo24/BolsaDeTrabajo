import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacantsPage } from './vacants.page';
import { VacantComponent } from '../../components/vacant/vacant.component';

const routes: Routes = [
  {
    path: '',
    component: VacantsPage
  },
  {
    path: 'vacant/:from/:id',
    component: VacantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacantsPageRoutingModule {}
