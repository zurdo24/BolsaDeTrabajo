import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacanciesPageRoutingModule } from './vacancies-routing.module';

import { VacanciesPage } from './vacancies.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchVacanciesComponent } from '../../component/search-vacancies/search-vacancies.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VacanciesPageRoutingModule
  ],
  declarations: [VacanciesPage, SearchVacanciesComponent]
})
export class VacanciesPageModule {}
