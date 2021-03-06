import { UiService } from './../../../shared/services/ui.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { CandidateService } from 'src/app/perfil-basico/services/candidate.service';
import { getStorage, setStorage } from 'src/app/shared/services/storage.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser = {
    username: '',
    password: ''
  };
  loginb = false;

    // show password
    isActiveToggleTextPassword = true;
  constructor(private authService: AuthService, private uiService: UiService, private navCtrl: NavController,
              private menuCtrl: MenuController, private candidateService: CandidateService ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave(){
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    this.authService.setUrl( environment.url);
    this.candidateService.setUrl(environment.url);
  }

  async login(form: NgForm){
    if (form.invalid) {return; }
    this.authService.login(this.loginUser.username, this.loginUser.password).then(res => {

      if (res.toString().match('no es candidato'))  {
        const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">  `;
        this.uiService.presentAlert2('', 'No es un candidato.', mssg, 'alertCancel', 'alertButton', 'ios');
        return;
      }

      if (res) {
        // const userId = JSON.parse( localStorage.getItem('_cap_id'));
        getStorage('id').then( id => {
          this.candidateService.getCandidate(id).subscribe(candidate => {
            setStorage('candidate', candidate);
          });
          setTimeout(() => {
            this.navCtrl.navigateRoot('/perfil-basico');
          }, 500);
        });

        // this.candidateService.getCandidate(userId).subscribe(candidate => {
        //   setStorage('candidate', candidate);
        // });
        // setTimeout(() => {
        //   this.navCtrl.navigateRoot('/perfil-basico', {animated: true});
        // }, 500);
      } else {
        const mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">  `;
        this.uiService.presentAlert2('', 'Usuario o contraseña incorrecta.', mssg, 'alertCancel', 'alertButton', 'ios');
      }

    });
  }

  // === show/hide password
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
  }
  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  onClick(){
    this.navCtrl.navigateRoot('/prueb');
  }
}
