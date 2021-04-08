import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from 'src/app/mi-perfil/services/certification.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { Certification, SubjectArea } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { getStorage } from 'src/app/shared/services/storage.service';
moment.locale('es');
@Component({
  selector: 'app-certification-opt',
  templateUrl: './certification-opt.component.html',
  styleUrls: ['./certification-opt.component.scss'],
})
export class CertificationOptComponent implements OnInit {
  idParam: string;
  subjectAreas: SubjectArea;
  createCertication: FormGroup;
  // variables auxiliares para el ion-input date
  title = '';
  btnText = '';

  maxDate1: string;
  minDate2: string;
  maxDate2: string;

  // mostrar contenido
  showcontent = true;
  constructor(private route: ActivatedRoute, private subjectAreaService: SubjectAreaService,
              private certificationService: CertificationService, private uiService: UiService,
              private navCtrl: NavController) {
                this.initForm();
              }

  async ngOnInit() {
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    this.idParam = this.route.snapshot.paramMap.get('id');
    this.maxDate1  = this.maxDate2 = this.getNowDate();
    this.minDate2 = ('1970');
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });

    if (this.idParam != null) {
      this.title = 'Editar Certificación';
      this.btnText = 'Actualizar';

      this.showcontent = false;
      const loading = await this.uiService.presentLoading('', 'loading-content', false);
      this.certificationService.getCertificationByIdCertification(this.idParam).pipe(
        finalize(async () => {
          await loading.dismiss();
          setTimeout(() => {
           this.showcontent = true;
           document.getElementById('content').classList.add('fade-in-fast');
          }, 100);
        })
      ).subscribe(certification => {
        this.dataEdit(certification);
      });
      return;
    }
    getStorage('id').then( candidateId => {
      this.createCertication.controls.cv_id.setValue(candidateId);
    });
    this.title = 'Añadir Certificación';
    this.btnText = 'Guardar';
  }
  async submit() {
    let header = '';
    let mssg = '';
    if (this.idParam){
        mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
        header = '¿Desea guardar los cambios?';
      } else {
        mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">`;
        header = '¿Desea guardar esta certificación?';
      }
    const alert = await this.uiService.presentAlert('', header, mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();
    if (data.role !== 'ok') {
      return;
    }

    if (this.idParam) {
      const loading = await this.uiService.presentLoading('Actualizando...', 'loading', false);
      this.certificationService.updateCertification(this.idParam, this.createCertication.value).pipe(
        finalize(async () => {
          await loading.dismiss();
          setTimeout(() => {
            this.navCtrl.navigateRoot('/mi-perfil/home/certification', { animationDirection: 'back' });
            document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
          }, 500);
        })
      ).subscribe(() => {});
      return;
    }
    const load = await this.uiService.presentLoading('Guardando...', 'loading', false);
    this.certificationService.createCertification(this.createCertication.value).pipe(
      finalize(async () => {
        await load.dismiss();
        setTimeout(() => {
          this.navCtrl.navigateRoot('/mi-perfil/home/certification', { animationDirection: 'back' });
          document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
        }, 500);
      })
    ).subscribe(() => {});
  }
  dataEdit(certification: Certification) {
    this.createCertication = new FormGroup({
      cv_id: new FormControl(certification.cv_id),
      organization: new FormControl(certification.organization),
      name: new FormControl(certification.name, Validators.required),
      subject_area_id: new FormControl(certification.subject_area_id),
      date_received: new FormControl(certification.date_received),
      date_expire: new FormControl(certification.date_expire),
    });
  }

  initForm() {
    this.createCertication = new FormGroup(  {
      cv_id: new FormControl(),
      organization: new FormControl(),
      name: new FormControl( '', Validators.required),
      subject_area_id: new FormControl(),
      date_received: new FormControl(),
      date_expire: new FormControl(),
    });
  }


  onChangeStart($event) {
    this.minDate2 = this.createCertication.get('date_received').value;
    this.createCertication.get('date_received').setValue(this.createCertication.get('date_received').value.substr(0, 10));
  }
  // le asigna las fechas correspondientes a year_end y month_end
  onChangeEnd($event) {

    this.maxDate1 = this.createCertication.get('date_expire').value;
    this.createCertication.get('date_expire').setValue(this.createCertication.get('date_expire').value.substr(0, 10));
  }
  getNowDate(){
    const date = new Date(); // Fecha actual
    const monthN = date.getMonth() + 1; // obteniendo mes
    const dayN = date.getDate(); // obteniendo dia
    const year = date.getFullYear(); // obteniendo año
    let day;
    let month;
    if (dayN < 10) {
      day = '0' + dayN;
    } // agrega cero si el menor de 10
    else {
      day = dayN;
    }
    if (monthN < 10) {
      month = '0' + monthN;
    } // agrega cero si el menor de 10
    else {
      month = monthN;
    }
    return year + '-' + month + '-' + day;
  }
}
