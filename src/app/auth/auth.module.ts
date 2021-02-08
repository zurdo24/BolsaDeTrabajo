import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PasswordRecoveryComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ]
})
export class AuthModule { }
