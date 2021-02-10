import { UiService } from './../../../shared/services/ui.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CandidateService } from 'src/app/perfil-basico/services/candidate.service';
import { setStorage } from 'src/app/shared/services/storage.service';

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
        const userId = JSON.parse( localStorage.getItem('_cap_id'));
        this.candidateService.getCandidate(userId).subscribe(candidate => {
          setStorage('candidate', candidate);
        });
        setTimeout(() => {
          this.navCtrl.navigateRoot('/perfil-basico', {animated: true});
        }, 500);
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
}
