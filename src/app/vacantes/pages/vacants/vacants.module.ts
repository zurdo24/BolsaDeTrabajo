import { FiltrosVacantPipe } from './../../pipes/filtros-vacant.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacantsPageRoutingModule } from './vacants-routing.module';

import { VacantsPage } from './vacants.page';
import { SharedModule } from '../../../shared/shared.module';
import { VacantesModule } from '../../vacantes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    VacantesModule,
    VacantsPageRoutingModule
  ],
  declarations: [VacantsPage]
})
export class VacantsPageModule {}
