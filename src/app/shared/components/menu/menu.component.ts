import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../../interfaces';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { clearStorage, getStorage } from '../../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [
    {
      title: 'Mi perfil',
      url: '/mi-perfil/home/work-experience',
      icon: 'person'
    },
    {
      title: 'Mis Oportunidades',
      url: '/opportunities',
      icon: 'git-network'
    },
    {
      title: 'Mis Postulaciones',
      url: '/postulations',
      icon: 'paper-plane'
    },
    {
      title: 'Buscar Vacantes',
      url: '/vacancies',
      icon: 'search'
    },
    {
      title: 'Mensajes',
      url: '/messages',
      icon: 'chatbubbles'
    },
    {
      title: 'Acceso',
      url: '/access',
      icon: 'settings-sharp'
    }


  ];

  @Input() url: string;
  @Input() candidate: Candidate = {firstname: '', lastname: '', photo: ''};
  constructor(private uiService: UiService, private navCtrl: NavController, private authService?: AuthService) { }
  ngOnInit() {
  }
  async clear(){
    const message = `<img src="./assets/alerts/info.png" class="card-alert-img">  `;
    const alert = await this.uiService.presentAlert('', '¿Desea cerrar su sesión?', message, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();
    // console.log(data);
    if (data.role === 'ok') {
      this.authService.setUrl(environment.url);
      getStorage('token').then( token => {
        this.authService.logout(token).subscribe( logout => {
          if ( logout.logout){
            clearStorage();
            this.navCtrl.navigateRoot('/login', { animated: true });
          }
          else{
            this.uiService.presentAlert2('', 'Ha ocurrido un error al realizar esta petición', `<img src="./assets/alerts/war.png" class="card-alert-img">  `, 'alertCancel', 'alertButton', 'ios');
            // const data = await alert.onDidDismiss();
          }
        });
      });
    }
    return;
  }
  router(url: string){
    this.navCtrl.navigateRoot(url, {animated: true});
  }
  routeRoot(){
    this.navCtrl.navigateRoot('/perfil-basico', {animated: true});
  }
}
