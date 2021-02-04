import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LanguageService } from 'src/app/mi-perfil/services/language.service';
import { LanguageList, LevelList, Language } from 'src/app/shared/interfaces';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-languages-opt',
  templateUrl: './languages-opt.component.html',
  styleUrls: ['./languages-opt.component.scss'],
})
export class LanguagesOptComponent implements OnInit {
  id: string;
  list: LanguageList;
  level: LevelList;
  language: Language;
  levelstart = '1';
  languagestart = '1';
  title = '';
  btnText = '';
  // ----- formato para almacenar la informacion a actualizar------
  data: FormGroup;
  // --------------------------------------------------------------
  constructor(private route: ActivatedRoute, private uiService: UiService, private languageService: LanguageService,
              private navCtrl: NavController) {
                this.initForm();
               }

  ngOnInit() {
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    this.id = this.route.snapshot.paramMap.get('id');
    this.languageService.getListComplete().subscribe( list => {
      this.list = list;
    });
    this.languageService.getLevelListComplete().subscribe( level => {
      this.level = level;
    });

    if (this.id){
      this.title = 'Editar idioma';
      this.btnText = 'Actualizar';
      this.languageService.getLanguage(this.id).subscribe( language => {
        this.language = language;
        this.initDataEdit();
      });
      return;
    }
    // para la opcion de agregar
    this.title = 'Añadir un idioma';
    this.btnText = 'Guardar';
    const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    this.data.get('cv_id').setValue(candidateId);

  }

  async submit(){
    let header = '';
    let mssg1 = '';
    if (this.id) {
      header = '¿Desea guardar los cambios?';
      mssg1 = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
     }
     else{
      header = '¿Desea añadir este idioma?';
      mssg1 = `<img src="./assets/alerts/info.png" class="card-alert-img">`;
     }
    const alert = await this.uiService.presentAlert('', header, mssg1, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();
    if (data.role !== 'ok') {
      return;
    }
    this.languageService.getLanguageExist(this.data.get('cv_id').value, this.data.get('language_list_id').value).subscribe( async exist => {
      if (this.languagestart === this.data.get('language_list_id').value) {
        if (this.levelstart === this.data.get('level_list_id').value) {
          this.navCtrl.navigateForward('/mi-perfil/home/languajes', { animated: true });
        } else {
          const load = await this.uiService.presentLoading('Actualizando...', 'loading', false);
          this.languageService.updateLanguage(
            this.data.get('id').value,
            this.languagestart,
            this.data.get('level_list_id').value,
            ).pipe(
              finalize(async () => {
                await load.dismiss();
                setTimeout(() => {
                  this.navCtrl.navigateForward('/mi-perfil/home/languajes', { animated: true });
                  document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
                }, 500);
              })
            ).subscribe( () => {
            });
        }
        return;
      }
      if ( exist[0] === 1 || this.id ) {
        const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">  `;
        this.uiService.presentAlert2('', 'Este idioma ya ha sido registrado en su cuenta.', mssg, 'alertCancel', 'alertButton', 'ios');
        return;
      }
      if (this.id) {
        const load = await this.uiService.presentLoading('Actualizando...', 'loading', false);
        this.languageService.updateLanguage(
          this.data.get('id').value,
          this.data.get('language_list_id').value,
          this.data.get('level_list_id').value,
          ).pipe(
            finalize(async () => {
              await load.dismiss();
              setTimeout(() => {
                this.navCtrl.navigateForward('/mi-perfil/home/languajes', { animated: true });
                document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
              }, 500);
            })
          ).subscribe( () => {
          });
        return;
      }
      const loading = await this.uiService.presentLoading('Guardando...', 'loading', false);
      this.languageService.addLanguage(
        this.data.get('cv_id').value,
        this.data.get('language_list_id').value,
        this.data.get('level_list_id').value,
        ).pipe(
          finalize(async () => {
            await loading.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateForward('/mi-perfil/home/languajes', { animated: true });
              document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
            }, 500);
          })
        ).subscribe( () => {} );
    });
  }

  initForm() {
    this.data = new FormGroup({
    id : new FormControl(''),
    cv_id: new FormControl(''),
    language_list_id: new FormControl('', Validators.required),
    level_list_id: new FormControl('', Validators.required),
    });
  }

  initDataEdit() {
    this.data = new FormGroup({
      id: new FormControl( this.language.id ),
      cv_id: new FormControl( this.language.cv_id ),
      language_list_id: new FormControl( this.language.language_list_id, Validators.required ),
      level_list_id: new FormControl( this.language.level_list_id, Validators.required),
    });
    this.levelstart = this.language.level_list_id;
    this.languagestart = this.language.language_list_id;
  }

}