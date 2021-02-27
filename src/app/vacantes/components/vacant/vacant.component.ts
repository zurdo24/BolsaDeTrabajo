import { UiService } from './../../../shared/services/ui.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { JobsOpening, Organization, JobType, City, State, Country, Candidate, SubjectArea, OpeningSkill, OpeningProgramme, OpeningLanguage, JobOpeningStatus, JobApplicationStatusLogs } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { JobOpeningService } from 'src/app/mis-oportunidades/services/job-opening.service';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { JobTypeService } from 'src/app/shared/services/job-type.service';
import { StateService } from 'src/app/shared/services/state.service';
import { OrganizationService } from '../../services/organization.service';
import { OpeningSkillService } from '../../services/opening-skill.service';
import { OpeningLanguageService } from '../../services/opening-language.service';
import { OpeningProgrammeService } from '../../services/opening-programme.service';
import { JobOpeningStatusService } from '../../services/job-opening-status.service';
import { JobApplicationStatusLogService } from '../../services/job-application-status-log.service';
import { MessageService } from 'src/app/mensajes/services/message.service';
import { finalize } from 'rxjs/operators';
import { getStorage } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.scss'],
})
export class VacantComponent implements OnInit {
  id: string; // id de la vacante a visualizar
  from: string; // desde que pagina proviene
  job_opening: JobsOpening;
  organization: Organization;
  job_type: JobType;
  city: City;
  state: State;
  country: Country;
  message: Message;
  candidate: Candidate;
  subjectArea: SubjectArea;
  openingSkill: OpeningSkill;
  openingProgramme: OpeningProgramme;
  openingLanguage: OpeningLanguage;
  jobStatus: JobOpeningStatus;
  chipStatus: JobApplicationStatusLogs;

  show = false;
  URLphotos = environment.urlPhotos;
  URL = environment.url;
  logo: string = null;
  canApplication = true;

  addMessage: FormGroup;

  // regresa
  backbuttonhref = '';
  constructor(
    private route: ActivatedRoute, private navCtrl: NavController,
    private cityService: CityService, private stateService: StateService,
    private countryService: CountryService, private jobTypeService: JobTypeService,
    private messageService: MessageService, private toastController: ToastController,
    private uiServiceService: UiService, private jobOpeningService: JobOpeningService,
    private subjectAreaService: SubjectAreaService, private organizationService: OrganizationService,
    private openingSkillService: OpeningSkillService, private openingLanguageService: OpeningLanguageService,
    private openingProgrammeService: OpeningProgrammeService,
    private jobOpeningStatusService: JobOpeningStatusService,
    private jobApplicationStatusLogService: JobApplicationStatusLogService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.from = this.route.snapshot.paramMap.get('from');
    this.jobOpeningService.getJobOpening(this.id).subscribe(job => {
      this.job_opening = job;
      this.initForm();
      this.getData();
    });
  }

  getData() {
    // se hizo la funcion para obtener el logo debido a que en en la funcion que llama del php
    // verifica si existe el archivo en la carpeta y en la base de datos al mismo tiempo
    this.organizationService.getLogo(this.job_opening.contact_id).subscribe(logo => {
      if (logo != null) {
        this.logo = this.URLphotos + '/btuady/public_html/' + logo;
      }
    });

    if (this.job_opening.subject_area_id != null) {
      this.subjectAreaService.getSubjectArea(this.job_opening.subject_area_id).subscribe(area => {
        this.subjectArea = area;
      });
    }

    this.openingSkillService.getOpeningSkillComplete(this.job_opening.id).subscribe(openingSkill => {
      this.openingSkill = openingSkill;
    });

    this.openingProgrammeService.getStudyProgrammeByOrganization(this.job_opening.id).subscribe(programme => {
      this.openingProgramme = programme;
    });

    this.openingLanguageService.getOpeningLanguage(this.job_opening.id).subscribe(languages => {
      this.openingLanguage = languages;
    });


    this.organizationService.getOrganization(this.job_opening.contact_id).subscribe(organization => {
      this.organization = organization;
      switch (this.from) {
        case 'c':
          if (this.organization != null) {
            this.backbuttonhref = `/messages/chat/${this.organization.contact_id}`;
          } else {
            this.backbuttonhref = '/messages';
            // this.navCtrl.navigateRoot('/messages');
          }
          break;
        case 'v':
          this.backbuttonhref = '/vacants';
          break;
        case 'o':
          this.navCtrl.navigateRoot('/oportunidades');
          break;
        case 'p':
          this.backbuttonhref = '/postulations';
          break;
        default:
          this.navCtrl.navigateRoot('/vacants');
          break;
      }
      this.jobApplicationStatusLogService.getJobASLShow(this.addMessage.get('from_user_id').value, this.id).subscribe(jab => {
        this.chipStatus = jab[0];
        // preguntar si esta contratado o esta postulado y mostrar la caja de texto
        if (jab[1][0] === '1') {
          this.canApplication = false;
        }
      });


      this.jobTypeService.getJobType(this.job_opening.job_type_id).subscribe(type => {
        this.job_type = type;
        
        if (this.job_opening.city_id != null) {
          this.cityService.getCity(this.job_opening.city_id).subscribe(city => {
            this.city = city;
            this.stateService.getState(this.city.state_id).subscribe(state => {
              this.state = state;
              this.countryService.getCountry(this.state.country_id).subscribe(country => {
                this.country = country;
                this.show = true;
              });
            });
          });

        } else {
          this.show = true;
        }

      });

    });
  }
  async send() {

    if (this.addMessage.get('text').value.trim() == '') {
      this.addMessage.get('text').setValue('');
    } else {
      this.addMessage.get('date_sent').setValue(this.getNowDate());
      this.jobOpeningService.getIsOpen(this.id).subscribe(async val => {
        if (val == 1) {
          const load = await this.uiServiceService.presentLoading('Enviando...', 'loading', false);
          this.messageService.addMessage(
            this.addMessage.get('from_user_id').value,
            this.addMessage.get('to_user_id').value,
            this.addMessage.get('text').value,
            this.addMessage.get('html_text').value,
            this.addMessage.get('date_sent').value).subscribe(message => {
              this.message = message;

              this.jobApplicationStatusLogService.addJobASL(
                this.addMessage.get('from_user_id').value,
                this.id,
                this.message.id,
                this.addMessage.get('date_sent').value,
                'application',
                this.addMessage.get('text').value
              ).pipe(
                finalize(async () => {
                  await load.dismiss();
                  setTimeout(() => {
                    this.navCtrl.navigateForward('/vacants', { animated: true });
                  }, 500);
                })
              ).subscribe(() => {
                // this.navCtrl.navigateRoot('/vacants');
              });

            });

        }
        else {
          const mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">  `;
          this.uiServiceService.presentAlert2('', 'Lo sentimos, esta vacante ha sido cerrada.', mssg, 'alertCancel', 'alertButton', 'ios');
          // this.uiServiceService.AlertaOK('Lo sentimos, esta vacante ha sido cerrada', 'info', '/vacantes');
        }
      });
    }


  }

  imprimir() {
    this.addMessage.get('date_sent').setValue(this.getNowDate());
  }

  initForm() {
    this.addMessage = new FormGroup({
      from_user_id: new FormControl('', Validators.required),
      to_user_id: new FormControl(this.job_opening.contact_id, Validators.required),
      text: new FormControl('', Validators.required),
      html_text: new FormControl(''),
      date_sent: new FormControl('')
    });
    getStorage('candidate').then(candidate => {
      this.candidate = candidate;
      this.addMessage.get('html_text').setValue('Ver CV: <a href="' + this.URL + '/candidate/profile?id=' + this.candidate.user_id + '">' + this.candidate.firstname + ' ' + this.candidate.lastname + '</a>');
      this.addMessage.get('from_user_id').setValue(this.candidate.user_id);
    });
  }

  getNowDate() {
    var date = new Date(); //Fecha actual
    var monthN = date.getMonth() + 1; //obteniendo mes
    var dayN = date.getDate(); //obteniendo dia
    var year = date.getFullYear(); //obteniendo año
    var HH = date.getHours();
    var MM = date.getMinutes();
    var SS = date.getSeconds();
    var day;
    var month;
    var HHH;
    var MMM;
    var SSS;
    //horas
    if (HH < 10)
      HHH = '0' + HH.toString(); //agrega cero si el menor de 10
    else
      HHH = HH;

    if (MM < 10)
      MMM = '0' + MM.toString(); //agrega cero si el menor de 10
    else
      MMM = MM;

    if (SS < 10)
      SSS = '0' + SS.toString(); //agrega cero si el menor de 10
    else
      SSS = SS;




    if (dayN < 10)
      day = '0' + dayN; //agrega cero si el menor de 10
    else
      day = dayN;

    if (monthN < 10)
      month = '0' + monthN; //agrega cero si el menor de 10
    else
      month = monthN;

    return year + '-' + month + '-' + day + ' ' + HHH + ':' + MMM + ':' + SSS;
  }



  async presentToast(type: string) {
    switch (type) {
      case 'invitation':
        var message = 'El contacto de esta vacante te ha enviado una invitacion';
        break;
      case 'application':
        var message = 'Ya te encuentras postulado en esta vacante';
        break;
      case 'hiring':
        var message = 'Has sido contratado por el contacto de esta vacante';
        break;
      default:
        var message = 'Sin interacciones';
        break;
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


}
