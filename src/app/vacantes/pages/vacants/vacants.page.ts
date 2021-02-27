import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { EducationService } from 'src/app/mi-perfil/services/education.service';
import { JobOpeningService } from 'src/app/mis-oportunidades/services/job-opening.service';
import { PopFilterComponent } from 'src/app/shared/components/pop-filter/pop-filter.component';
import { Vacant, AcademicTraining } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { getStorage } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-vacants',
  templateUrl: './vacants.page.html',
  styleUrls: ['./vacants.page.scss'],
})
export class VacantsPage implements OnInit {
  URL = environment.urlPhotos;
  logo = this.URL + '/btuady/public_html/files/logo/organization/';
  jobsOpening: Vacant;
  findData: FormGroup;
  end = 10;
  total: any;
  academicTraining: AcademicTraining[];
  textFinder = '';
  buscar = true;
  showVacants: boolean ;
  candidateId :any;
  constructor(private jobOpeningService: JobOpeningService,
              private educationService: EducationService,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController, ) {
                this.initForm();
               }

  ngOnInit() {
    // this.candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    getStorage('id').then( candidateId => {
      this.candidateId=candidateId
      console.log(this.candidateId)
    // console.log(this.candidateId)

      this.educationService.getEducationVacants(this.candidateId).subscribe(academicTraining => {
        this.academicTraining = academicTraining;
        if (Object.keys(this.academicTraining).length > 0) {
          this.showVacants = true;
          this.jobOpeningService.getJobsListOpen().subscribe(jobs => {
            this.jobsOpening = jobs;
            this.total = Object.keys(jobs).length;
          });
        }
        else {
          this.showVacants = false;
        }

      })
    }) //corte del getStorage
  }

  async showpop(event) {
    const popover = await this.popoverCtrl.create({
      component: PopFilterComponent,
      componentProps: {
        year_Experience: this.findData.get('year_Experience').value,
        job_Type: this.findData.get('job_Type').value,
        city: this.findData.get('city').value,
        study_Programe: this.findData.get('study_Programe').value,
        subject_Area: this.findData.get('subject_Area').value,
        sueldo: this.findData.get('sueldo').value
      },
      event,
      mode: 'ios',
      cssClass: 'my-pop-over-style',
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    // console.log(data)
    if (data != null && data.year_Experience !== undefined &&
      data.job_Type !== undefined && data.city !== undefined &&
      data.study_Programe !== undefined && data.subject_Area !== undefined &&
      data.sueldo !== undefined) {
      this.findData.get('year_Experience').setValue(data.year_Experience),
        this.findData.get('job_Type').setValue(data.job_Type),
        this.findData.get('city').setValue(data.city),
        this.findData.get('study_Programe').setValue(data.study_Programe),
        this.findData.get('subject_Area').setValue(data.subject_Area),
        this.findData.get('sueldo').setValue(data.sueldo);
    }
  }
  initForm() {
    this.findData = new FormGroup({
      year_Experience: new FormControl(''),
      job_Type: new FormControl(''),
      city: new FormControl(''),
      study_Programe: new FormControl(''),
      subject_Area: new FormControl(''),
      sueldo: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }

  find(event: any) {
    this.textFinder = event.detail.value;
  }
  showSearchBar() {
    if (this.buscar) {
      this.buscar = false;
    }
    else {
      this.buscar = true;
    }
  }
  goSeeVacant(id: string) {    
    this.navCtrl.navigateRoot('/vacants/vacant/v/' + id, {animated: true});

  }
  // da la opcion de elementos para mostrar en la pagina
  show(event: any) {
    this.end = event.detail.value;
    // console.log(event.detail.value)
  }
  // regresa el tamaño del arreglo con el fin de mostrar o no la palabra (Aptitudes)
  fun(text) {
    return Object.keys(text).length;
  }

   // verifica si es el ultimo arreglo de la lista, estetica
   islast(array: any, j: any) {
    if (array[Object.keys(array).length - 1] === j) {
      return true;
    }
    else {
      return false;
    }
  }


}
