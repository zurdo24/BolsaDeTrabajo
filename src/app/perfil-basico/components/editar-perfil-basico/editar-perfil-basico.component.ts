import { UiService } from './../../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Candidate, User, Country, City, State, OrganizationUnit } from 'src/app/shared/interfaces';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { OrganizationUnitService } from 'src/app/shared/services/organization-unit.service';
import { StateService } from 'src/app/shared/services/state.service';
import { setStorage } from 'src/app/shared/services/storage.service';
import { CandidateService } from '../../services/candidate.service';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { LoadingController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-editar-perfil-basico',
  templateUrl: './editar-perfil-basico.component.html',
  styleUrls: ['./editar-perfil-basico.component.scss'],
})
export class EditarPerfilBasicoComponent implements OnInit {
  // Datos necesarios

  candidate: Candidate;
  user: User;
  countries: Country;
  cities: City;
  states: State;
  organizationUnit: OrganizationUnit;
  countryId = '';
  cityId: string;
  stateId: string;
  // --------------------
  updateData: FormGroup;
  // ----------------------

  // ----- Variables para los errores
  userNameminlength = false;
  userNamePattern = false;
  first = false;
  firstSate = false;

  //
  load: any;
  constructor(private countryService: CountryService, private cityService: CityService, private stateService: StateService,
              private organizationUnitService: OrganizationUnitService, private userService: UserService,
              private candidateService: CandidateService, private loadingCtrl: LoadingController, private uiService: UiService,
              private navCtrl: NavController) {
    this.initForm();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_cap_user'));
    this.candidate = JSON.parse(localStorage.getItem('_cap_candidate'));
    // ----- Esta seccion es para inicializar la lista de pais estado y ciudad
    this.organizationUnitService.getOrganizationUnits().subscribe(organizationUnit => {
      this.organizationUnit = organizationUnit;
    });
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });

    // ---------- inicializa  el objeto candidate para llenar el formulario
    this.cityService.getCity(this.candidate.city_id).subscribe(city => {
      this.stateId = city.state_id;
      setStorage('state_id', this.stateId);
      this.cityId = this.candidate.city_id;
      this.stateService.getState(city.state_id).subscribe(state => {
        this.countryId = state.country_id;
        this.dataEdit();
        // paraa inicializar el objeto del estado y ciudad
        this.stateService.getStateByCountry(this.countryId).subscribe(states => {
          this.states = states[0];
        });
        this.cityService.getCitiesByState(this.stateId).subscribe(cities => {
          this.cities = cities[0];
        });
      });
    });
  }

  // *********************************************
  // es para comparar contraseñas
  passwordid(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;
    if (control.value !== forma.controls.userData.controls.password.value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  //  esta funcion se usa para hacer los cambios en la bd
  async update() {
    const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
    const header = '¿Desea guardar los cambios?';
    const alert = await this.uiService.presentAlert('', header, mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();

    if (data.role !== 'ok') {
      return;
    }
    this.load = await this.uiService.presentLoading('Guardando...', 'loading', false);
    const dat = moment(this.updateData.controls.birth_date.value).format('YYYY-MM-DD');
    this.updateData.controls.birth_date.setValue(dat);
    this.userService.updateUser(this.user.id, this.updateData.controls.userData.value).then((user) => {
      this.user = user;
      setStorage('user', this.user);

    }, (err) => {
      console.log(err);
    });
    this.candidateService.updateCandidate(this.user.id, this.updateData.value)
    .pipe(
      finalize(async () => {
        // Hide the loading spinner on success or error
        await this.load.dismiss();
        setTimeout(() => {
          this.navCtrl.navigateBack('/perfil-basico', {animated: true});
        }, 500);
      })
    ).subscribe(candidate => {
      this.candidate = candidate;
      setStorage('candidate', this.candidate);
    });

  }
  // dataEdit
  dataEdit() {
    this.updateData = new FormGroup({
      userData: new FormGroup({
        // tslint:disable-next-line: max-line-length
        username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(128), Validators.pattern('^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9._-]+(?![-_.])$')]),
        email: new FormControl(this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=^.{7,30}$)((?=.*)(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*$')]),
        password_confirm: new FormControl(),
      }),

      firstname: new FormControl(this.candidate.firstname, Validators.required),
      lastname: new FormControl(this.candidate.lastname, Validators.required),
      sex: new FormControl(this.candidate.sex, Validators.required),
      birth_date: new FormControl(this.candidate.birth_date, Validators.required),
      marital_status: new FormControl(this.candidate.marital_status, Validators.required),
      phone: new FormControl(this.candidate.phone),
      cellphone: new FormControl(this.candidate.cellphone),
      city_id: new FormControl(this.candidate.city_id, Validators.required),
      curp: new FormControl(this.candidate.curp),
      student_id_number: new FormControl(this.candidate.student_id_number),
      organization_unit_id: new FormControl(this.candidate.organization_unit_id, Validators.required),
      country_id: new FormControl(this.countryId),
      state_id: new FormControl(this.stateId),
    });
    // this.updateData.controls.curp.disable();
    this.updateData.controls.userData.get('password_confirm').setValidators([
      Validators.required, this.passwordid.bind(this.updateData)
    ]);
  }
  // iniciliza el formGroup
  initForm() {
    this.updateData = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        password_confirm: new FormControl(),
      }),
      firstname: new FormControl(),
      lastname: new FormControl(),
      sex: new FormControl(),
      birth_date: new FormControl(),
      marital_status: new FormControl(),
      phone: new FormControl(),
      cellphone: new FormControl(),
      city_id: new FormControl(),
      curp: new FormControl({ value: ''}),
      student_id_number: new FormControl({ value: ''}),
      organization_unit_id: new FormControl(),
      country_id: new FormControl(),
      state_id: new FormControl(),
    });
  }

  // *********************************************
  // Funciones que se lanzan cuando hay un cambio en el ion-select
  onChangeCountry($event) {
    if (this.first === false) {
      this.first = true;
      this.updateData.updateValueAndValidity();
    } else {
      this.updateData.controls.state_id.setValue('');
      this.updateData.controls.city_id.setValue('');
      this.updateData.updateValueAndValidity();
    }
    this.stateService.getStateByCountry($event.target.value).subscribe(states => {
      this.states = states[0];
    });
    this.cities = null;
  }
  onChangeState($event) {
    if (this.firstSate === false) {
      this.firstSate = true;
      this.updateData.updateValueAndValidity();
    } else {
      this.updateData.controls.city_id.setValue('');
      this.updateData.updateValueAndValidity();
    }
    this.cityService.getCitiesByState($event.target.value).subscribe(cities => {
      this.cities = cities[0];
    });
  }


  // Para mostrar dialogos de error en alguna validacion
  advertenciaUserData() {
    if (this.updateData.controls.userData.get('username').getError('minlength')) {
      this.userNameminlength = true;
    } else {
      this.userNameminlength = false;
    }
    if (this.updateData.controls.userData.get('username').getError('pattern')) {
      this.userNamePattern = true;
    } else {
      this.userNamePattern = false;
    }
  }
  changePassword() {
    this.updateData.controls.userData.get('password_confirm').setValue('');
    this.updateData.controls.userData.get('password_confirm').updateValueAndValidity();
  }
}
