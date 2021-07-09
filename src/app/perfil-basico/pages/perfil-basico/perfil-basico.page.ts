import { MenuComponent } from './../../../shared/components/menu/menu.component';
import { UiService } from './../../../shared/services/ui.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { OrganizationUnit, Candidate, City, State, Country, User, Cv } from 'src/app/shared/interfaces';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { CvService } from 'src/app/shared/services/cv.service';
import { OrganizationUnitService } from 'src/app/shared/services/organization-unit.service';
import { StateService } from 'src/app/shared/services/state.service';
import { environment } from 'src/environments/environment';
import { CandidateService } from '../../services/candidate.service';
import { NavController } from '@ionic/angular';
import { getStorage,setStorage } from 'src/app/shared/services/storage.service';
import { DisconnectedService } from './../../../shared/services/disconnected.service';



@Component({
  selector: 'app-perfil-basico',
  templateUrl: './perfil-basico.page.html',
  styleUrls: ['./perfil-basico.page.scss'],
})
export class PerfilBasicoPage implements OnInit {
  val: string = null;
  URL = environment.urlPhotos;
  photoRoutbase: string = this.URL + '/btuady/public_html/files/photo/';
  edad: string = null;
  ciudad: string = null;
  estado: string = null;
  pais: string = null;
  photoRout = '';

  organizationunit: OrganizationUnit = {};
  candidate: Candidate = {};
  city: City = {};
  state: State = {};
  country: Country = {};
  user: User = {};
  cv: Cv = {};
  isConnected = false;

  imageToShow: any;
  menucom = new MenuComponent(this.uiService, this.navCtrl);
  constructor(private cityService: CityService, private stateService: StateService, private countryService: CountryService,
              private organizationunitService: OrganizationUnitService, private cvService: CvService,
              private userService: UserService, private candService: CandidateService, private uiService: UiService,
              private disccService: DisconnectedService, private navCtrl: NavController, private appComponent: AppComponent) { 
              }

  ionViewWillEnter(){
    this.disccService.seturl('/perfil-basico')
  }   


  chargeImg(){
 
        if (this.candidate.photo == null) {
            this.imageToShow = './assets/image/' + this.candidate.sex + '.png';
            setStorage('imageToShow', this.imageToShow);
            // this.appComponent.setphotoRout(this.imageToShow);
            // console.log("ESTE CANDIDATO NO TIENE IMAGEN")
            this.appComponent.chargeIMG()

          } else {
            // this.photoRout = this.photoRoutbase + this.candidate.photo;
            this.candService.getPhoto(this.candidate.user_id).subscribe( data => {
              this.createImageFromBlob(data);
              // setStorage('imageToShow', this.imageToShow);
              // this.appComponent.setphotoRout(this.imageToShow);
              // console.log("ESTE CANDIDATO SIII TIENE IMAGEN")
              this.appComponent.chargeIMG()

            })
          }
   
  }



  ngOnInit() {
    getStorage('candidate').then( candidate => {
      this.candService.setUrl(environment.url);
      this.userService.setUrl(environment.url);

      this.userService.getUser(candidate.user_id).subscribe(user => {
        this.user = user;
        this.candService.getCandidate(candidate.user_id).subscribe(candidate => {
          this.candidate = candidate;
          this.chargeImg() //CARGAR IMAGEN
          this.appComponent.setCandidateInfo(candidate);
          this.translateInfo();
          // carga del curriculum
          this.cvService.getCv(this.candidate.user_id).subscribe(cv => {
            this.cv = cv;
          });
        });
      });

    });//corte del getStorage
  }
  calculateAge(birthday) {
    // tslint:disable-next-line: variable-name
    const birthday_arr = birthday.split('-');
    // tslint:disable-next-line: variable-name
    const birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    const ageDifMs = Date.now() - birthday_date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  translateInfo() {
    if (this.candidate.sex === 'male') {
      this.candidate.sex = 'Hombre';
    } else {
      this.candidate.sex = 'Mujer';
    }

    if (this.candidate.marital_status === 'married') {
      if (this.candidate.sex === 'Mujer') {
        this.candidate.marital_status = 'Casada';
      }
      else {
        this.candidate.marital_status = 'Casado';
      }
    } else {
      if (this.candidate.sex === 'Mujer') {
        this.candidate.marital_status = 'Soltera';
      }
      else {
        this.candidate.marital_status = 'Soltero';
      }
    }

    // if (this.candidate.photo == null) {
    //   this.photoRout = './assets/image/' + this.candidate.sex + '.png';
    //   this.appComponent.setphotoRout(this.photoRout);
    // } else {
    //   this.photoRout = this.photoRoutbase + this.candidate.photo;
    //   this.appComponent.setphotoRout(this.photoRout);
    // }

    this.edad = this.calculateAge(this.candidate.birth_date).toString();
    this.organizationunitService.getOrganizationUnit(this.candidate.organization_unit_id).subscribe(organizationunit => {
      this.organizationunit = organizationunit;
    });


    this.cityService.getCity(this.candidate.city_id).subscribe(city => {
      this.city = city;
      this.stateService.getState(this.city.state_id).subscribe(state => {
        this.state = state;
        this.countryService.getCountry(this.state.country_id).subscribe(country => {
          this.country = country;
          // prueba
          // this.appComponent.loadInformation();
          //
        });
      });
    });
  }

  async opcionesCv() {
    const aSheet = await this.uiService.presentActionSheet2('Opciones', 'Editar', 'edit', 'create', '');
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }
    this.navCtrl.navigateRoot('/perfil-basico/editar-cv', { animated: true });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    // console.log("SE EJECUTA ESTO")
    reader.addEventListener('load', () => {
       this.imageToShow = reader.result;
       setStorage('imageToShow', this.imageToShow);
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
