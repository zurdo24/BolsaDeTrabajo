import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Match } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { environment } from 'src/environments/environment';
import { JobOpeningService } from '../../services/job-opening.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.page.html',
  styleUrls: ['./opportunities.page.scss'],
})
export class OpportunitiesPage implements OnInit {
  URL = environment.urlPhotos;
  Match: Match;
  ismatch = false;
  logo = this.URL + '/btuady/public_html/files/logo/organization/';
  constructor( private cvService: CvService,
               private jobOpeningService: JobOpeningService,
               private navCtrl: NavController) { }

  ngOnInit() {
    const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    this.cvService.matchCv(candidateId).subscribe((response) => {


      if (response.ok === true) {
        this.ismatch = true;
        this.jobOpeningService.jobsMatch(response.match).subscribe((match) => {
        this.Match = match;
      });
      } else { this.ismatch = false; }

    });
  }

  islast(array: any, j: any) {
    if (array[Object.keys(array).length - 1] === j) {
      return true;
    } else {
      return false;
    }
  }

  goSeeVacant(id: string) {
    this.navCtrl.navigateForward('/vacante/o/' + id, { animated: true });
  }

}
