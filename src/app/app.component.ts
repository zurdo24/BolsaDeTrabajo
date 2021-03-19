import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Candidate } from './shared/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  candidate: Candidate = {firstname: '', lastname: '', photo: ''};
  URL = environment.urlPhotos;
  photoRoutbase = this.URL + '/btuady/public_html/files/photo/';
  photoRout = '';
  confirm = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setphotoRout(url: string){
    console.log(url)
    this.photoRout = url;
  }
  setCandidateInfo(candidate: Candidate){
    this.candidate = candidate;
  }
}
