import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Match } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { getStorage } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';
import { JobOpeningService } from '../../services/job-opening.service';
import { DisconnectedService } from './../../../shared/services/disconnected.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.page.html',
  styleUrls: ['./opportunities.page.scss'],
})
export class OpportunitiesPage implements OnInit {
   
  Match: Match;
  ismatch = false;
  viewinfo = false;
  viewcard = false;
   
  constructor( private cvService: CvService,
               private jobOpeningService: JobOpeningService,
               private navCtrl: NavController,
               private disccService: DisconnectedService) { }

  ionViewWillEnter(){
    this.disccService.seturl('/opportunities')
  }

  ngOnInit() {
    getStorage('id').then( candidateId => {
      this.cvService.matchCv(candidateId).pipe(
        finalize(async () => {
        })
      ).subscribe(response => {
        if (response.ok === true) {
          this.jobOpeningService.jobsMatch(response.match). pipe(
            finalize(async () => {
              setTimeout(() => {
               if (this.Match) {
                this.ismatch = true;
                this.viewcard = true;
                document.getElementById('content').classList.add('fade-in');
                return;
               }
              }, 100);
            })
          ).subscribe(match => {
            this.Match = match;
          });
          return;
        }

        this.ismatch = true;
        this.viewinfo = true;
        // this.ismatch = false;
        // this.viewinfo = false;
      });
    });
  }

  islast(array: any, j: any) {
    if (array[Object.keys(array).length - 1] === j) {
      return true;
    } else {
      return false;
    }
  }
// http://localhost:8100/vacants/vacant/p/6090
  goSeeVacant(id: string) {
    this.navCtrl.navigateForward('vacants/vacant/o/' + id, { animated: true });
  }

}
