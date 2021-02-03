import { PerfilBasicoModule } from './../../perfil-basico.module';
import { SharedModule } from './../../../shared/shared.module';
import { HeaderComponent } from './../../../shared/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilBasicoPageRoutingModule } from './perfil-basico-routing.module';

import { PerfilBasicoPage } from './perfil-basico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PerfilBasicoModule,
    PerfilBasicoPageRoutingModule
  ],
  declarations: [PerfilBasicoPage]
})
export class PerfilBasicoPageModule {}
