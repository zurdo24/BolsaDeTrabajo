import { EditarCvComponent } from './components/editar-cv/editar-cv.component';
import { EditarPerfilBasicoComponent } from './components/editar-perfil-basico/editar-perfil-basico.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarPerfilBasicoSkeletonComponent } from './components/editar-perfil-basico-skeleton/editar-perfil-basico-skeleton.component';



@NgModule({
  declarations: [
    EditarPerfilBasicoComponent,
    EditarCvComponent,
    EditarPerfilBasicoSkeletonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EditarPerfilBasicoComponent,
    EditarPerfilBasicoSkeletonComponent
  ]
})
export class PerfilBasicoModule { }
