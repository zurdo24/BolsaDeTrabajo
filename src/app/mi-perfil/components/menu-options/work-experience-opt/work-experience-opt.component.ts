import { LineBusinessService } from './../../../services/line-business.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { WorkExperienceService } from 'src/app/mi-perfil/services/work-experience.service';
import { LineBusiness, WorkExperience } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { getStorage } from 'src/app/shared/services/storage.service';
moment.locale('es');
@Component({
  selector: 'app-work-experience-opt',
  templateUrl: './work-experience-opt.component.html',
  styleUrls: ['./work-experience-opt.component.scss'],
})
export class WorkExperienceOptComponent implements OnInit {
  // Datos necesarios
  id: string; // id del workExperience a modificar
  now = new Date(); // calcula la fecha actual
  minDate: string; // pone los datos de las fechas en minimos
  maxDate: string;
  minStartYear: any; // el año minimo
  workExperience: WorkExperience;
  lineBusiness: LineBusiness;
  noww = moment();
  // ----- formato para almacenar la informacion a actualizar------
  data: FormGroup;
  // --------------------------------------------------------------
  headerTitle = '';
  btnText = '';

  // mostrar contenido
  showcontent = true;
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private workExperienceService: WorkExperienceService,
              private linebusinessService: LineBusinessService, private uiService: UiService) {
    this.initForm();
    if (this.now.getMonth() < 10) {
      this.minDate = this.maxDate = this.now.getFullYear() + '-0' + (this.now.getMonth() + 1) ;
    }
    else {
      this.minDate = this.maxDate = this.now.getFullYear() + '-' + (this.now.getMonth() + 1);
    }
  }

  async ngOnInit() {
    const date = moment();
    const minYear = date.year() - 50;
    this.minStartYear = minYear;
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    // recupera la id enviada como parametro (app-routing)
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.showcontent = false;
      this.btnText = 'Actualizar';
      this.headerTitle = 'Editar Experiencia Laboral';
      const loading = await this.uiService.presentLoading('', 'loading-content', false);
      this.workExperienceService.getWorkExperience(this.id).pipe(
        finalize(async () => {
          await loading.dismiss();
          setTimeout(() => {
           this.showcontent = true;
           document.getElementById('content').classList.add('fade-in-fast');
          }, 100);
        })
      ).subscribe(workexperience => {
        this.workExperience = workexperience;

        // si el workexperience es su trabajo actual is is_current_job se pone en true y se le asigna una fecha maxDate por si
        // decide cambiar la fecha de termino
        if (this.workExperience.end == null) {
          this.workExperience.is_current_job = true;
          this.workExperience.end = this.maxDate;
          this.workExperience.month_end = this.maxDate.substr(5, 2);
          this.workExperience.year_end = this.maxDate.substr(0, 4);

        }
        else {
          this.workExperience.is_current_job = false;
        }
        this.data = new FormGroup({
          wexperienceData: new FormGroup({
            id: new FormControl(this.workExperience.id, Validators.required),
            cv_id: new FormControl(0),
            company: new FormControl(this.workExperience.company, [Validators.required, Validators.maxLength(175)]),
            line_business_id: new FormControl(this.workExperience.line_business_id, ),
            date_start: new FormControl(this.workExperience.start, Validators.required),
            date_end: new FormControl(this.workExperience.end, ),
            job_title: new FormControl(this.workExperience.job_title, [Validators.required, Validators.maxLength(175)]),
            month_start: new FormControl(this.workExperience.month_start, Validators.required),
            year_start: new FormControl(this.workExperience.year_start, Validators.required),
            month_end: new FormControl(this.workExperience.month_end, Validators.required),
            year_end: new FormControl(this.workExperience.year_end, Validators.required),
            description: new FormControl(this.workExperience.description, ),
            is_current_job: new FormControl(this.workExperience.is_current_job, ),
          }),
          name: new FormControl(''),
        });
        // no se laza el evento ionchange al iniciar la vista, por eso se asgina los valores
        this.data.get('wexperienceData').get('year_start').setValue(this.data.get('wexperienceData').get('date_start').value.substr(0, 4));
        this.data.get('wexperienceData').get('month_start').setValue(this.data.get('wexperienceData').get('date_start').value.substr(5, 2));

        this.data.get('wexperienceData').get('year_end').setValue(this.data.get('wexperienceData').get('date_end').value.substr(0, 4));
        this.data.get('wexperienceData').get('month_end').setValue(this.data.get('wexperienceData').get('date_end').value.substr(5, 2));
        this.data.updateValueAndValidity();

      });

    } else {
      this.btnText = 'Guardar';
      this.headerTitle = 'Añadir Experiencia Laboral';
      getStorage('id').then( candidateId => {
        this.data = new FormGroup({
          wexperienceData: new FormGroup({
            id: new FormControl(),
            cv_id: new FormControl(candidateId, Validators.required),
            company: new FormControl('', [Validators.required, Validators.maxLength(175)]),
            line_business_id: new FormControl(''),
            date_start: new FormControl('', Validators.required),
            date_end: new FormControl(''),
            job_title: new FormControl('',   [Validators.required, Validators.maxLength(175)]),
            month_start: new FormControl('', Validators.required),
            year_start: new FormControl('', Validators.required),
            month_end: new FormControl('', Validators.required),
            year_end: new FormControl('', Validators.required),
            description: new FormControl(''),
            is_current_job: new FormControl(0),
          }),
          name: new FormControl(''),
        });
      });
    }

    this.linebusinessService.getLineBusinesslist().subscribe(lineBusiness => {
      this.lineBusiness = lineBusiness;
    });
  }
  imprimir() {
    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    this.navCtrl.navigateBack('/mi-perfil/home/work-experience', { animationDirection: 'back' });
  }


  // si se desmarca el checkbox la fecha se pone como maxDate por si lo desmarca esa sera la fecha por defecto
  clickbox(): void {

    if (!this.data.get('wexperienceData').get('is_current_job').value) {
      this.data.get('wexperienceData').get('date_end').setValue(this.maxDate);
      this.data.get('wexperienceData').get('year_end').setValue(this.maxDate.substr(0, 4));
      this.data.get('wexperienceData').get('month_end').setValue(this.maxDate.substr(5, 2));
    }

  }

  // le asigna las fechas correspondientes a year_start y month_start
  onChangeStart(event) {
    this.minDate = this.data.get('wexperienceData').get('date_start').value;
    this.data.get('wexperienceData').get('year_start').setValue(this.data.get('wexperienceData').get('date_start').value.substr(0, 4));
    this.data.get('wexperienceData').get('month_start').setValue(this.data.get('wexperienceData').get('date_start').value.substr(5, 2));
  }
  // le asigna las fechas correspondientes a year_end y month_end
  onChangeEnd($event) {
    this.data.get('wexperienceData').get('year_end').setValue(this.data.get('wexperienceData').get('date_end').value.substr(0, 4));
    this.data.get('wexperienceData').get('month_end').setValue(this.data.get('wexperienceData').get('date_end').value.substr(5, 2));
  }




  async updateWorkExperience() {

    // tslint:disable-next-line: max-line-length
    if (this.data.get('wexperienceData').get('company').value.trim() === '' || this.data.get('wexperienceData').get('job_title').value.trim() === '') {
      if (this.data.get('wexperienceData').get('company').value.trim() === '') {
        this.data.get('wexperienceData').get('company').setValue('');
      } else {
        this.data.get('wexperienceData').get('job_title').setValue('');
      }

    } else {
      let header = '';
      let mssg = '';
      if (this.id){
        mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
        header = '¿Desea guardar los cambios?';
      } else {
        mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">`;
        header = '¿Desea guardar la nueva experencia de trabajo?';
      }
      const alert = await this.uiService.presentAlert('', header, mssg, 'alertCancel', 'alertButton', 'ios');
      const data = await alert.onDidDismiss();

      if (data.role === 'ok') {
        if (!this.id) {
          const loading = await this.uiService.presentLoading('Guardando...', 'loading', false);
          this.workExperienceService.addWorkExperience(
            this.data.get('wexperienceData').get('cv_id').value ,
            this.data.get('wexperienceData').get('company').value,
            this.data.get('wexperienceData').get('line_business_id').value ,
            this.data.get('wexperienceData').get('job_title').value ,
            this.data.get('wexperienceData').get('month_start').value ,
            this.data.get('wexperienceData').get('year_start').value ,
            this.data.get('wexperienceData').get('month_end').value ,
            this.data.get('wexperienceData').get('year_end').value ,
            this.data.get('wexperienceData').get('description').value,
            this.data.get('wexperienceData').get('is_current_job').value ).pipe(
            finalize(async () => {
              await loading.dismiss();
              setTimeout(() => {
                this.navCtrl.navigateRoot('/mi-perfil/home/work-experience', { animated: true });
                document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
              }, 500);
            })
          ).subscribe( () => {
          });
          return;
        }
        const load = await this.uiService.presentLoading('Actualizando...', 'loading', false);
        this.workExperienceService.updateWorkExperience(
          this.id,
          this.data.get('wexperienceData').get('company').value,
          this.data.get('wexperienceData').get('line_business_id').value,
          this.data.get('wexperienceData').get('job_title').value,
          this.data.get('wexperienceData').get('month_start').value,
          this.data.get('wexperienceData').get('year_start').value,
          this.data.get('wexperienceData').get('month_end').value,
          this.data.get('wexperienceData').get('year_end').value,
          this.data.get('wexperienceData').get('description').value,
          this.data.get('wexperienceData').get('is_current_job').value
        ).pipe(
          finalize(async () => {
            await load.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateRoot('/mi-perfil/home/work-experience', { animated: true });
              document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
            }, 500);
          })
        ).subscribe(() => {
        });
      }
    }
  }

  initForm() {
    this.data = new FormGroup({
      wexperienceData: new FormGroup({
        id: new FormControl(),
        cv_id: new FormControl(),
        company: new FormControl(), // empleador
        line_business_id: new FormControl(), // id LineBusiness
        job_title: new FormControl(), // puesto
        date_start: new FormControl(), // auxiliar 1
        date_end: new FormControl(), // auxiliar 2
        month_start: new FormControl(),
        year_start: new FormControl(),
        month_end: new FormControl(),
        year_end: new FormControl(),
        description: new FormControl(),
        is_current_job: new FormControl(),
      }),
      name: new FormControl(),
    });
  }


}
