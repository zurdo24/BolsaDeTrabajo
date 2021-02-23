import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Applications } from 'src/app/shared/interfaces';
import { getStorage } from 'src/app/shared/services/storage.service';
import { JobApplicationStatusLogService } from 'src/app/vacantes/services/job-application-status-log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.page.html',
  styleUrls: ['./postulations.page.scss'],
})
export class PostulationsPage implements OnInit {
  URL = environment.urlPhotos;
  logo = this.URL + '/btuady/public_html/';
  applications: Applications;
  open0 = false;
  color0 = 'gold';
  open1 = false;
  color1 = 'gold';
  open2 = false;
  color2 = 'gold';
  constructor(private jobApplicationStatusLogService: JobApplicationStatusLogService, private navCtrl: NavController) { }
  ngOnInit() {
    getStorage('id').then( candidateId => {
      this.jobApplicationStatusLogService.getApplications(candidateId).subscribe(applications => {
        this.applications = applications;
        this.open0 = true;
        this.open1 = true;
        this.open2 = true;
      });
    });
  }
  goSeeVacant(id: string){
    this.navCtrl.navigateForward('/vacants/vacant/p/' + id);

  }
  // regresa el tamaño del arreglo con el fin de mostrar o no la palabra (Aptitudes)
  fun(text){
    return  Object.keys(text).length;
  }

  // verifica si es el ultimo arreglo de la lista, estetica 
  islast(array: any, j: any){
    if (array[Object.keys(array).length - 1] === j) {
      return true;
    }
    else{
      return false;
    }
  }
  expand(num: number){
    if (num === 1) {
      if (this.open1 === true) {
        this.open1 = false;
        this.color1 = 'white';
      }
      else {
        this.open1 = true;
        this.color1 = 'gold';
      }
    }
    if (num === 2) {
      if (this.open2 === true) {
        this.open2 = false;
        this.color2 = 'white';
      }
      else {
        this.open2 = true;
        this.color2 = 'gold';
      }
    }
    if (num === 0) {
      if (this.open0 === true) {
        this.open0 = false;
        this.color0 = 'white';
      }
      else {
        this.open0 = true;
        this.color0 = 'gold';
      }
    }
  }


}
