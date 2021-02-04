import { MenuComponent } from './../menu/menu.component';

import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() route: string;
  @Input() backbutton: boolean;
  @Input() backbuttonhref: string;
  @Input() miPerfil: false;
  constructor(private menuCtrl: MenuController, private navCtrl: NavController, private uiService: UiService) { }

  ngOnInit() {
    this.miPerfil = false;
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  backbuttonhreff(){
    if (this.miPerfil){
      document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
      this.navCtrl.navigateBack(this.backbuttonhref, { animationDirection: 'back' });
      return;
    }
    this.navCtrl.navigateBack(this.backbuttonhref, { animationDirection: 'back' });
  }
  routef(){
    this.navCtrl.navigateRoot(this.route, { animationDirection: 'forward' });
  }
}
