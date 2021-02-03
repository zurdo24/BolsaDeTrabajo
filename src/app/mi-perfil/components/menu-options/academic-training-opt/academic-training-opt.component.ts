import { UiService } from './../../../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DegreeService } from 'src/app/mi-perfil/services/degree.service';
import { EducationService } from 'src/app/mi-perfil/services/education.service';
import { StatusEducationService } from 'src/app/mi-perfil/services/status-education.service';
import { StudyProgrammeService } from 'src/app/mi-perfil/services/study-programme.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { OrganizationUnitService } from 'src/app/shared/services/organization-unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Degree, OrganizationUnit, StudyPrograme, StatusEducation, SubjectArea, Education } from 'src/app/shared/interfaces';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
moment.locale('es');

@Component({
  selector: 'app-academic-training-opt',
  templateUrl: './academic-training-opt.component.html',
  styleUrls: ['./academic-training-opt.component.scss'],
})
export class AcademicTrainingOptComponent implements OnInit {
  // auxiliares
  isUpdate = false;
  checkedinit = '';
  checkedVal = '';
  aux: string;
  // =====
  minDate = '';
  startDate = '';
  endDate = '';

  // ============
  statEducation: number;
  idParam: string;
  // Objetos necesarios para llenar el formulario
  degrees: Degree;
  organizationUnit: OrganizationUnit;
  studyProgrammes: StudyPrograme;
  statusEducations: StatusEducation;
  subjectAreas: SubjectArea;
  // objeto para crear e inyectar en la bd -- tambien para llenar el form del html
  data: FormGroup;
  title = '';
  constructor(private route: ActivatedRoute, private educationService: EducationService,
              private studyProgrammeService: StudyProgrammeService,
              private degreeService: DegreeService, private statusEducationService: StatusEducationService,
              private organizationUnitService: OrganizationUnitService, private uiService: UiService,
              private subjectAreaService: SubjectAreaService, private navCtrl: NavController) {
    this.initForm(); // inicializa el formgroup
  }
  ngOnInit() {
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    // ======== Servicios para llenar los objetos ========= //
    // llena el objeto degrees con todos los degrees - tabla degree
    this.degreeService.getDegres().subscribe(degrees => {
      this.degrees = degrees;
    });
    // llena el objeto organizationUnit con todas las facultades de la UADY - consulta tabla organization_unit
    this.organizationUnitService.getOrganizationUnits().subscribe(orgUnit => {
      this.organizationUnit = orgUnit;
    });
    // llena el objeto statusEducations con los tipos que hay en la bd - consulta tabla status_educations
    this.statusEducationService.getStatusEducations().subscribe(statusEducations => {
      this.statusEducations = statusEducations;
    });
    // llena el objeto subjectAreas  - consulta tabla subject_area
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
      // console.log(subjectAreas, 'areas');
    });
    // ==================================================================================================
    this.idParam = this.route.snapshot.paramMap.get('id');
    const idCandidate = JSON.parse(localStorage.getItem('_cap_id'));
    if (this.idParam != null) {
      this.title = 'Editar formación Académica';
      this.isUpdate = true;
      // ============= datos para la opcion Editar =======================
      // consulta la tabala education y regresa los datos de acuerdo al id
      this.educationService.getEducationById(this.idParam).subscribe(education => {
        // en caso que no sea egresado de la uady
        if (education.study_programme_id === null) {

          this.checkedinit = '2';
          this.dataEdit('2', education, null);
        } else {
          this.checkedinit = '1';
          this.studyProgrammeService.getStufyProgramme(education.study_programme_id).subscribe(studyProgramme => {
            this.dataEdit('1', education, studyProgramme.organization_unit_id);
            // tslint:disable-next-line: max-line-length
            this.studyProgrammeService.getStudyProgrammeByOrgDegree(studyProgramme.organization_unit_id, education.degree_id).subscribe(studyProgrammes => {
              this.studyProgrammes = studyProgrammes;

            });
          });
        }
      });
    } else {
      // =========== Datos para la opcion Agregar ==============
      this.dataAddEducation(idCandidate);
    }
  }
  clickbox(event) {
    // si 1 es de la UADY
    if (event.detail.value === '1') {
      this.checkedVal = '1';
      setTimeout(() => {
        this.data.controls.institution.setValue(1);
        this.data.controls.study_programme_id.setValidators(Validators.required);
        this.data.controls.organization_unit_id.setValidators(Validators.required);
        this.data.controls.study_programme_id.updateValueAndValidity();
        this.data.controls.organization_unit_id.updateValueAndValidity();

        this.data.controls.study_programme_name.clearValidators();
        this.data.controls.subject_area_id.clearValidators();
        this.data.controls.institution_name.clearValidators();
        this.data.controls.study_programme_name.updateValueAndValidity();
        this.data.controls.subject_area_id.updateValueAndValidity();
        this.data.controls.institution_name.updateValueAndValidity();

        // se limpia los datos innecesarios
        this.data.controls.institution_name.setValue(null);
        this.data.controls.study_programme_name.setValue(null);
        this.data.controls.subject_area_id.setValue(null);
      }, 100);
    } else {
      this.checkedVal = '2';
      setTimeout(() => {
        // en caso de que sea de otra institucion
        this.data.controls.institution.setValue(2);
        this.data.controls.study_programme_name.setValidators(Validators.required);
        this.data.controls.subject_area_id.setValidators(Validators.required);
        this.data.controls.institution_name.setValidators(Validators.required);

        this.data.controls.study_programme_name.updateValueAndValidity();
        this.data.controls.subject_area_id.updateValueAndValidity();
        this.data.controls.institution_name.updateValueAndValidity();

        // desabilita las validaciones requeridas no necesarias
        this.data.controls.study_programme_id.clearValidators();
        this.data.controls.organization_unit_id.clearValidators();
        this.data.controls.study_programme_id.updateValueAndValidity();
        this.data.controls.organization_unit_id.updateValueAndValidity();
        // limpia los datos inecesarios
        this.data.controls.organization_unit_id.setValue(null);
        this.data.controls.study_programme_id.setValue(null);
      }, 100);

    }
  }
  // Funciones que se lanzan cuando hay un cambio en el ion-select de grado de estudio
  orgUnit($event, tipo: boolean, select?: string) {
    if (this.checkedVal === '1') {
      this.data.controls.organization_unit_id.setValidators(Validators.required);
      this.data.controls.organization_unit_id.updateValueAndValidity();
    }
    if (tipo) {
      this.studyProgrammeService.getStudyProgrammeByOrgDegree(this.aux, $event.target.value).subscribe(studyProgrammes => {
        this.studyProgrammes = studyProgrammes;
      });
    } else {
      this.studyProgrammeService.getStudyProgrammeByOrgDegree($event.target.value, select).subscribe(studyProgrammes => {
        this.aux = $event.target.value;
        this.studyProgrammes = studyProgrammes;
      });
    }
  }
  async update() {
    const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">  `;
    const alert = await this.uiService.presentAlert('', 'Desea guardar los cambios', mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();

    if (data.role === 'ok') {
      if (this.isUpdate) {
        const loading = await this.uiService.presentLoading('Guardando...', 'loading', false);
        this.educationService.updateEducation(this.idParam, this.data.value).pipe(
          finalize(async () => {
            await loading.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateForward('/mi-perfil/home/academic-training', { animated: true });
              document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
            }, 500);
          })
        ).subscribe(() => { });
        return;
      }
      const load = await this.uiService.presentLoading('Guardando...', 'loading', false);
      this.educationService.createEducation(this.data.value).pipe(
        finalize(async () => {
          await load.dismiss();
          setTimeout(() => {
            this.navCtrl.navigateForward('/mi-perfil/home/academic-training', { animated: true });
            document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
          }, 500);
        })
      ).subscribe(() => { });
    }
  }
  // tslint:disable-next-line: max-line-length
  // status education -- se utiliza para mostrar u ocultar la fecha final. en caso de que sea uno se muestra la fecha de finalizacion en el html
  statusEducation($event) {
    this.statEducation = $event.target.value;
    if (this.statEducation.toString().match('1')) {
      this.data.controls.year_end.setValidators(Validators.required);
      this.data.controls.year_end.setValue('2020');
      this.data.controls.month_end.setValue('01');
      const date = moment();
      this.minDate = date.format('YYYY-MM-DD');
      this.endDate = date.format('YYYY-MM-DD');
    } else {
      this.data.controls.year_end.clearValidators();
      this.data.controls.year_end.updateValueAndValidity();
      this.data.controls.year_end.setValue(null);
      this.data.controls.month_end.setValue(null);
    }
  }

  initForm() {
    this.data = new FormGroup({
      institution: new FormControl(),
      cv_id: new FormControl(),
      degree_id: new FormControl(),
      institution_name: new FormControl(),
      study_programme_id: new FormControl(),
      study_programme_name: new FormControl(),
      subject_area_id: new FormControl(),
      status_education_id: new FormControl(),
      month_start: new FormControl(),
      year_start: new FormControl(),
      month_end: new FormControl(),
      year_end: new FormControl(),
      organization_unit_id: new FormControl(),
    });
  }

  dataEdit(institution: string, education: Education, organizationunitid: string) {
    const dateStart = moment(education.start);
    const dateEnd = moment(education.end);
    const monthStart = dateStart.month() + 1;
    const monthEnd = dateEnd.month() + 1;

    this.data = new FormGroup({
      institution: new FormControl(institution, Validators.required),
      cv_id: new FormControl(education.cv_id),
      degree_id: new FormControl(education.degree_id, Validators.required),
      institution_name: new FormControl(education.institution_name),
      study_programme_id: new FormControl(education.study_programme_id),
      study_programme_name: new FormControl(education.study_programme_name),
      subject_area_id: new FormControl(education.subject_area_id),
      status_education_id: new FormControl(education.status_education_id, Validators.required),
      month_start: new FormControl(monthStart.toString(), Validators.required),
      year_start: new FormControl(dateStart.year().toString(), Validators.required),
      month_end: new FormControl(monthEnd.toString()),
      year_end: new FormControl(dateEnd.year().toString()),
      organization_unit_id: new FormControl(organizationunitid),
    });
    this.data.controls.year_start.setValidators(Validators.required);
    this.startDate = education.start;
    this.endDate = education.end;
  }

  dataAddEducation(idCandidate: string) {
    // se hacen las validaciones iniciales para el formulario
    this.data = new FormGroup({
      institution: new FormControl('', Validators.required),
      cv_id: new FormControl(idCandidate),
      degree_id: new FormControl('', Validators.required),
      institution_name: new FormControl(),
      study_programme_id: new FormControl(),
      study_programme_name: new FormControl(),
      subject_area_id: new FormControl(),
      status_education_id: new FormControl('', Validators.required),
      month_start: new FormControl('01', Validators.required),
      year_start: new FormControl('2020', Validators.required),
      month_end: new FormControl('01'),
      year_end: new FormControl('2020'),
      organization_unit_id: new FormControl(),
    });
    const date = moment();
    this.startDate = date.format('YYYY MMMM DD');
    this.data.controls.year_start.setValidators(Validators.required);

  }
  planStudy() {
    if (this.checkedVal === '1') {
      this.data.controls.study_programme_id.setValidators(Validators.required);
      this.data.controls.study_programme_id.updateValueAndValidity();
    }
  }
  onChangeDate(event, dateT: string) {
    const date = new Date(event.detail.value);

    if (dateT.match('start')) {
      this.data.controls.year_start.setValue(date.getFullYear().toString());
      if (date.getMonth() < 9) {
        this.minDate = date.getFullYear() + '-0' + (date.getMonth() + 1);
        const month = date.getMonth() + 1;
        this.data.controls.month_start.setValue('0' + month);
        return;
      }
      this.minDate = date.getFullYear() + '-' + (date.getMonth() + 1);
      const monthh = date.getMonth() + 1;
      this.data.controls.month_start.setValue(monthh.toString());
      return;
    }

    this.data.controls.year_end.setValue(date.getFullYear().toString());
    if (date.getMonth() < 9) {
      const month = date.getMonth() + 1;
      this.data.controls.month_end.setValue('0' + month);
      return;
    }
    const monthhh = date.getMonth() + 1;
    this.data.controls.month_end.setValue(monthhh.toString());
    return;
  }


}
