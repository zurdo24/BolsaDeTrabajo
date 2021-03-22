import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LanguageService } from 'src/app/mi-perfil/services/language.service';
import { LanguageComplete } from 'src/app/shared/interfaces';
import { getStorage } from 'src/app/shared/services/storage.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { DisconnectedService } from './../../../../shared/services/disconnected.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  languages: LanguageComplete;

  constructor(private languageService: LanguageService, private disccService: DisconnectedService
    , private uiService: UiService, private navCtrl: NavController) { }


  ionViewWillEnter(){
    this.disccService.seturl('/mi-perfil/home/languajes')
  }
  ngOnInit() {

    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    getStorage('id').then( candidateId => {
      this.languageService.getLanguagesComplete(candidateId).subscribe(languages => {
        this.languages = languages;
      });
    });
  }
  async opcionesIdioma(id: string) {
    const aSheet = await this.uiService.presentActionSheet();
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    if (data.role === 'edit'){
      this.navCtrl.navigateRoot(`/mi-perfil/home/languajes/edit/${id}`, { animationDirection: 'forward' });
      document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    }

    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar este idioma de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');

      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.languageService.deleteLanguage(id).pipe(
          finalize(async () => {
            this.ngOnInit();
          })
        ).subscribe(() => {

        });
      }
    }
  }
  doRefresh(event) {
    getStorage('id').then( candidateId => {
      this.languageService.getLanguagesComplete(candidateId).pipe(
        finalize(async () => {
          event.target.complete();
        })
      ).subscribe(academicTraining => {
        this.languages = academicTraining;
      });
    });
  }
  onClick(){
    this.navCtrl.navigateRoot('/mi-perfil/home/languajes/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }
}
