import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinConeccionPageRoutingModule } from './sin-coneccion-routing.module';

import { SinConeccionPage } from './sin-coneccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinConeccionPageRoutingModule
  ],
  declarations: [SinConeccionPage]
})
export class SinConeccionPageModule {}
