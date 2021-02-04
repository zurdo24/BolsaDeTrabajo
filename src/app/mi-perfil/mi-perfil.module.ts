import { AptitudesOptComponent } from './components/menu-options/aptitudes-opt/aptitudes-opt.component';
import { LanguagesOptComponent } from './components/menu-options/languages-opt/languages-opt.component';
import { CertificationOptComponent } from './components/menu-options/certification-opt/certification-opt.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { WorkExperienceComponent } from './components/menu/work-experience/work-experience.component';
import { LanguagesComponent } from './components/menu/languages/languages.component';
import { AcademicTrainingComponent } from './components/menu/academic-training/academic-training.component';
import { AptitudesComponent } from './components/menu/aptitudes/aptitudes.component';
import { CertificationComponent } from './components/menu/certification/certification.component';
import { CoursesComponent } from './components/menu/courses/courses.component';
import { WorkExperienceOptComponent } from './components/menu-options/work-experience-opt/work-experience-opt.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AcademicTrainingOptComponent } from './components/menu-options/academic-training-opt/academic-training-opt.component';
import { CoursesOptComponent } from './components/menu-options/courses-opt/courses-opt.component';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [
    WorkExperienceComponent,
    LanguagesComponent,
    AcademicTrainingComponent,
    AptitudesComponent,
    CertificationComponent,
    CoursesComponent,
    WorkExperienceOptComponent,
    AcademicTrainingOptComponent,
    CoursesOptComponent,
    CertificationOptComponent,
    LanguagesOptComponent,
    AptitudesOptComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class MiPerfilModule { }
