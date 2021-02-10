import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Candidate } from '../../interfaces';
import { UiService } from '../../services/ui.service';
import { NavController } from '@ionic/angular';
import { retry } from 'rxjs/operators';

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
      url: '/vacants',
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
  constructor(private uiService: UiService, private navCtrl: NavController) { }
  ngOnInit() {
  }
  async clear(){
    const message = `<img src="./assets/alerts/info.png" class="card-alert-img">  `;
    const alert = await this.uiService.presentAlert('', '¿Desea cerrar su sesión?', message, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();
    if (data.role === 'ok') {
      localStorage.clear();
      this.navCtrl.navigateRoot('/login');
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
