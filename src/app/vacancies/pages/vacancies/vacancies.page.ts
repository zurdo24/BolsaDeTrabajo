import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { EducationService } from 'src/app/mi-perfil/services/education.service';
import { PopFilterComponent } from 'src/app/shared/components/pop-filter/pop-filter.component';
import { Vacant } from 'src/app/shared/interfaces';
import { getStorage } from 'src/app/shared/services/storage.service';
import { JobOpeningService } from '../../../mis-oportunidades/services/job-opening.service';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.page.html',
  styleUrls: ['./vacancies.page.scss'],
})
export class VacanciesPage implements OnInit {
  jobsOpening: Vacant[] = [];
  jobsOpeningSearch: Vacant[] = [];

  searching = false;
  showVacants = false;
  showVacants2 = true;

  showSkeleton = true;

  infinitScrollFilter = false;
  findData: FormGroup;

  habilitado = true;
  constructor(private jobOpeningService: JobOpeningService, private educationService: EducationService,
              private navCtrl: NavController, private popoverCtrl: PopoverController, private uiService: UiService) {
                this.initForm();
              }

  ngOnInit() {
    getStorage('id').then(id => {
      this.educationService.getEducationVacants(id).subscribe(academicTraining => {
        if (academicTraining.length === 0 ) {
          this.showVacants2 = false;
          return;
        }
        this.nextJobs();
      });

    });

  }
  goSeeVacant(id: string) {
    this.jobOpeningService.setpageJobs(0);
    this.jobOpeningService.setPageJobsFilter(0);
    this.navCtrl.navigateRoot('/vacants/vacant/v/' + id, {animated: true});

  }
  nextJobs(event?,  pull: boolean = false) {
    this.jobOpeningService.getJobsOpen(pull).pipe(
      finalize(async () => {
        this.showVacants = true;
        this.showSkeleton = false;
      })
    ).subscribe(jobs => {
      if (jobs.length < 10) {
        this.habilitado = false;
     }
      this.jobsOpening.push(...jobs);
      if (event) {
        event.target.complete();
      }
      if ( jobs.length === 0 ) {
        // this.habilitado = false;
      }
    });
  }

  // funcion para la lista que se busca por nombre
  search(event) {
    const text: string = event.detail.value;

    if ( text.length === 0 ) {
      this.searching = false;
      this.showVacants = true;
      this.jobsOpeningSearch = [];
      return;
    }

    this.searching = true;
    this.showVacants = false;
    this.jobOpeningService.searchJobOpen(text).subscribe(jobs => {
      console.log(jobs);
      this.jobsOpeningSearch = jobs;
      this.searching = false;
    });
  }
  // ======= Opciones del popover Filtrer ======= //
  async showpop(event) {
    const popover = await this.popoverCtrl.create({
      component: PopFilterComponent,
      event,
      mode: 'ios',
      cssClass: 'my-pop-over-style',
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data.data === 'error') {
      return;
    }
    if (data.data === 'clean') {
      this.jobsOpening = [];
      this.showSkeleton = true;
      this.habilitado = true;
      this.jobOpeningService.setPageJobsFilter(0);
      this.jobOpeningService.setpageJobs(0);
      this.initForm();
      this.uiService.dataFilter.setValue(this.findData.value);
      this.nextJobs();
      this.infinitScrollFilter = false;
      return;
    }
    this.findData.setValue(this.uiService.dataFilter.value);
    this.infinitScrollFilter = true;
    this.jobsOpening = [];
    this.showSkeleton = true;
    this.habilitado = true;
    this.jobOpeningService.setPageJobsFilter(0);
    this.jobOpeningService.setpageJobs(0);

    this.nextJobsFilter();
  }
  nextJobsFilter(event?,  pull: boolean = false) {
    this.jobOpeningService.searchJobOpenFilter(pull, this.findData.value).pipe(
      finalize(async () => {
        this.showSkeleton = false;
      })
    ).subscribe(jobs => {
      if (jobs.length < 10) {
         this.habilitado = false;
      }
      this.jobsOpening.push(...jobs);
      // console.log( this.jobsOpening);
      if (event) {
        event.target.complete();
      }
    });
  }
  initForm() {
    this.findData = new FormGroup({
      years_experience: new FormControl(''),
      job_type_id: new FormControl(''),
      city_id: new FormControl(''),
      study_programme_id: new FormControl(''),
      subject_area_id: new FormControl(''),
      salary: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }
}
