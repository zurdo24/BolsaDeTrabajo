import { LanguagesOptComponent } from './../../components/menu-options/languages-opt/languages-opt.component';
import { CertificationOptComponent } from './../../components/menu-options/certification-opt/certification-opt.component';
import { CoursesOptComponent } from './../../components/menu-options/courses-opt/courses-opt.component';
import { WorkExperienceOptComponent } from './../../components/menu-options/work-experience-opt/work-experience-opt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { WorkExperienceComponent } from '../../components/menu/work-experience/work-experience.component';
import { AcademicTrainingComponent } from '../../components/menu/academic-training/academic-training.component';
import { CoursesComponent } from '../../components/menu/courses/courses.component';
import { CertificationComponent } from '../../components/menu/certification/certification.component';
import { LanguagesComponent } from '../../components/menu/languages/languages.component';
import { AptitudesComponent } from '../../components/menu/aptitudes/aptitudes.component';
import { AcademicTrainingOptComponent } from '../../components/menu-options/academic-training-opt/academic-training-opt.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'home/work-experience',
    component: HomePage
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'work-experience',
        component: WorkExperienceComponent,
      },
      {
        path: 'academic-training',
        component: AcademicTrainingComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'certification',
        component: CertificationComponent
      },
      {
        path: 'languajes',
        component: LanguagesComponent
      },
      {
        path: 'aptitudes',
        component: AptitudesComponent
      },
      {
        path: 'work-experience/edit/:id',
        component: WorkExperienceOptComponent
      },
      {
        path: 'work-experience/add',
        component: WorkExperienceOptComponent
      },
      {
        path: 'academic-training/edit/:id',
        component: AcademicTrainingOptComponent
      },
      {
        path: 'academic-training/add',
        component: AcademicTrainingOptComponent
      },
      {
        path: 'courses/edit/:id',
        component: CoursesOptComponent
      },
      {
        path: 'courses/add',
        component: CoursesOptComponent
      },
      {
        path: 'certification/edit/:id',
        component: CertificationOptComponent
      },
      {
        path: 'certification/add',
        component: CertificationOptComponent
      },
      {
        path: 'languajes/edit/:id',
        component: LanguagesOptComponent
      },
      {
        path: 'languajes/add',
        component: LanguagesOptComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
