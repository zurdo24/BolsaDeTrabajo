import { UiService } from './../../../shared/services/ui.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

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
  constructor(private authService: AuthService, private uiService: UiService, private navCtrl: NavController,
              private menuCtrl: MenuController, ) { }

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
    this.authService.login(this.loginUser.username, this.loginUser.password).finally( () => {
      setTimeout(() => {
        if(this.loginb){
          this.navCtrl.navigateRoot('/perfil-basico', {animated: true});
        }
      }, 500);
    } ).then(res => {

      if (res.toString().match('no es candidato'))  {
        // this.uiService.AlertaOK('No es un candidato',"war","");
        return;
      }

      if (res) {
        this.loginb = true;
        // this.navCtrl.navigateRoot('/perfil-basico', {animated: true});
      } else {
        this.uiService.AlertaOK('usuario o contraseña incorrecta', 'war', '');
      }

    });
  }
}
