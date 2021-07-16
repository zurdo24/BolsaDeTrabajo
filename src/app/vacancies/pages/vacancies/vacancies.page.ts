import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { finalize, sample } from 'rxjs/operators';
import { EducationService } from 'src/app/mi-perfil/services/education.service';
import { CandidateService } from 'src/app/perfil-basico/services/candidate.service';
import { PopFilterComponent } from 'src/app/shared/components/pop-filter/pop-filter.component';
import { Vacant, Skill } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { DisconnectedService } from 'src/app/shared/services/disconnected.service';
import { getStorage } from 'src/app/shared/services/storage.service';
// import { runInThisContext } from 'vm';
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
  showVacants = false; //vacantes
  showVacants2 = true; //falta informacion

  showSkeleton = true;

  infinitScrollFilter = false;
  findData: FormGroup;

  habilitado = true;

  formAcademic = false;
  cv = false;
  photo = false;
  filterColor = 'light';
  constructor(private jobOpeningService: JobOpeningService, private educationService: EducationService,
              private navCtrl: NavController, private popoverCtrl: PopoverController, private uiService: UiService,
              private disccService: DisconnectedService, private cvService : CvService) {
                this.initForm();
              }

  ngOnInit() {
    getStorage('id').then(id => {
      this.jobOpeningService.getCanViewJobs(id).subscribe(data => {
        this.formAcademic = !data['educacion'];
        this.photo = !data['photo'];
        if (data['cv'] === 'Por favor llena el resumen de tu CV'){
          this.cv = true;
        }

        if (this.formAcademic || this.cv || this.photo){
          this.showVacants2 = false;
          this.habilitado = false;
          this.showSkeleton = false;
          return;
        }
        this.nextJobs();

      })

    });

  }
  ionViewWillEnter(){
    this.disccService.seturl('/vacancies');
  }
  goSeeVacant(id: string) {
    this.jobOpeningService.setpageJobs(0);
    this.jobOpeningService.setPageJobsFilter(0);
    this.navCtrl.navigateForward('/vacants/vacant/v/' + id, {animated: true});

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
      this.filterColor = 'light';
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
    this.filterColor = 'light';
    this.findData.setValue(this.uiService.dataFilter.value);
    this.uiService.dataFilter.get('city_id').setValue(data.city);
    // console.log(data);
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



  // verifica si es el ultimo arreglo de la lista, estetica
  islast(skill: Skill[], iskill: number) {
    if (skill.length - 1 === iskill) {
      return true;
    }
    return false;
  }


}
