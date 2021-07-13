import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Candidate } from './shared/interfaces';
import { environment } from 'src/environments/environment'; 

import { getStorage, setStorage } from './shared/services/storage.service';
import { CandidateService } from './perfil-basico/services/candidate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  candidate: Candidate = {firstname: '', lastname: '', photo: ''};
  
  img:any;
  confirm = false;
  candidateR: Candidate;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private candService: CandidateService,
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

  setphotoRout(url: any){
    // console.log("this.setphotoRout")
    this.img = url;
  }
  setCandidateInfo(candidate: Candidate){
    this.candidate = candidate;
  }

  chargeIMG(){
    // console.log("charge")
    // console.log(this.photoRout)
    // console.log(this.img)

    getStorage('imageToShow').then( img => {
    // console.log("RECUPERADO")

      // console.log(img)

      // if(this.img==undefined  || this.img==null   || this.img=="" ){

        if (img!=undefined  && img!=null   && img!=""){
          if (this.img!=img){
            this.img=img        
            // console.log("ASIGNADO diferente")            
          }
          else{
            // console.log("no ASIGNADO por igual")
          }
        }else{
          // console.log("no hay nada nen el storage")
          getStorage('candidate').then( cand => {


          

          if (cand != null && cand != undefined) {
            if (cand.photo==null || cand.photo==undefined){
              this.img = './assets/image/' + cand.sex + '.png';
              // this.setphotoRout(this.img)
              setStorage('imageToShow',  this.img);
              // this.chargeIMG()
            }
            else {
              // this.photoRout = this.photoRoutbase + this.candidate.photo;
              this.candService.getPhoto(cand.user_id).subscribe( data => {
                this.createImageFromBlob(data);
              })
            }
            

          } 
          else
          {
          // console.log("no hay candidato")

          }
        })

          // this.img
        }
      })


    //   getStorage('candidate').then( cand => {
    //     if(cand== undefined || cand == null){
    //       return
    //     }
    //     this.candidateR=cand;
    //       if (this.candidateR.photo == null) {
              
    //             if(this.candidateR.sex=="male"){
    //               this.setphotoRout('./assets/image/' + "Hombre.png");
    //             }
    //             else{
    //               this.setphotoRout('./assets/image/' + "Mujer.png");
    //             }
    //         } else {
    //             this.setphotoRout(this.photoRoutbase + this.candidateR.photo);
    //         }

    //   })
    // }
      // console.log("imagen despues de cargar")
      // console.log(this.img)

  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    // console.log("SE EJECUTA ESTO")
    reader.addEventListener('load', () => {
       this.img = reader.result;
      //  this.setphotoRout(this.img)
       setStorage('imageToShow', this.img);
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
