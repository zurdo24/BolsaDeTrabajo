import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulationsPageRoutingModule } from './postulations-routing.module';

import { PostulationsPage } from './postulations.page';
import { PipesModule } from 'src/app/mi-perfil/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    PostulationsPageRoutingModule
  ],
  declarations: [PostulationsPage]
})
export class PostulationsPageModule {}
