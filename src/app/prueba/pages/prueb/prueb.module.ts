// import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebPageRoutingModule } from './prueb-routing.module';

import { PruebPage } from './prueb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SharedModule,
    PruebPageRoutingModule
  ],
  declarations: [PruebPage]
})
export class PruebPageModule {}
