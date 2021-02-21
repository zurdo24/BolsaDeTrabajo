import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { PopFilterComponent } from './components/pop-filter/pop-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    PopFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    PopFilterComponent
  ]
})
export class SharedModule { }
