import { UiService } from './../../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cv } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-cv',
  templateUrl: './editar-cv.component.html',
  styleUrls: ['./editar-cv.component.scss'],
})
export class EditarCvComponent implements OnInit {

  val: string = null;
  conf: boolean = null;
  cv: Cv = {};
  re = /[a-z0-9._%+-]/;

  constructor(private cvService: CvService, private uiService: UiService,
              private navCtrl: NavController) { }

  ngOnInit() {
    const candidateId = JSON.parse(localStorage.getItem('_cap_id'));
    this.cvService.getCv(candidateId).subscribe(cv => {
      this.cv = cv;
    });
  }

  async savechanges() {
    if (this.cv.summary.trim() !== '') {
      // tslint:disable-next-line: no-shadowed-variable
      const mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">  `;
      const alert = await this.uiService.presentAlert('', 'Desea guardar los cambios', mssg, 'alertCancel', 'alertButton', 'ios');
      const data = await alert.onDidDismiss();

      if (data.role === 'ok') {
        const load = await this.uiService.presentLoading('Guardando...', 'loading', false);
        this.cvService.updateCv(this.cv.candidate_id, this.cv.status, this.cv.summary.trim()).pipe(
          finalize(async () => {
            await load.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateForward('/perfil-basico', {animated: true});
            }, 500);
          })
        ).subscribe(() => {
        });
      }
      return;
    }

    const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">  `;
    this.uiService.presentAlert('', 'Resumen no puede estar vacío. Por favor use caracteres [A-z][0-9]', mssg, 'alertCancel', 'alertButton', 'ios');
  }


}
