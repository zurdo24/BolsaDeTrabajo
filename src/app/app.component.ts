import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Candidate } from './shared/interfaces';
import { environment } from 'src/environments/environment';

import { getStorage } from './shared/services/storage.service';

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
  candidateR: Candidate;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // console.log(this.photoRout)
    this.chargeIMG()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setphotoRout(url: string){
    this.photoRout = url;
  }
  setCandidateInfo(candidate: Candidate){
    this.candidate = candidate;
  }

  chargeIMG(){

    if(this.photoRout==""){
      // console.log("cargar imagen") 
      getStorage('candidate').then( cand => {
        if(cand== undefined || cand == null){
          // console.log(cand)
          return
        }

        this.candidateR=cand;
        // console.log(this.candidateR )

          if (this.candidateR.photo == null) {
              
                if(this.candidateR.sex=="male"){
                  this.setphotoRout('./assets/image/' + "Hombre.png");
                }
                else{
                  this.setphotoRout('./assets/image/' + "Mujer.png");
                }

              
            } else {
                // this.photoRout = this.photoRoutbase + this.candidate.photo;
                this.setphotoRout(this.photoRoutbase + this.candidateR.photo);
            }

      })
    }

  }

}
