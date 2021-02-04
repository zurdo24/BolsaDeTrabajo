import { PipesModule } from './../mi-perfil/pipes/pipes.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule
  ]
})
export class MisPostulacionesModule { }
