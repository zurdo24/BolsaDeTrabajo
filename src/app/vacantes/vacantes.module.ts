import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FiltrosVacantPipe } from './pipes/filtros-vacant.pipe';
import { IonicModule } from '@ionic/angular';
import { VacantComponent } from './components/vacant/vacant.component';



@NgModule({
  declarations: [FiltrosVacantPipe, VacantComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    FiltrosVacantPipe
  ]
})
export class VacantesModule { }
