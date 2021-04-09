import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Skill } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { getStorage } from 'src/app/shared/services/storage.service';
import { UiService } from '../../../../shared/services/ui.service';

@Component({
  selector: 'app-aptitudes-opt',
  templateUrl: './aptitudes-opt.component.html',
  styleUrls: ['./aptitudes-opt.component.scss'],
})
export class AptitudesOptComponent implements OnInit {
  valstart = 1;
  valend = 12;
  textFinder = '';
  skill: Skill;

  skills: Skill[];
  // ----- formato para almacenar la informacion a actualizar------
  addData: FormGroup;
  // --------------------------------------------------------------

  constructor(private uiService: UiService,
              private cvsKillService: CvService,
              private navCtrl: NavController) {
    this.initform();
  }

  ngOnInit() {
    this.cvsKillService.getSkillListComplete().subscribe(skills => {
      this.skills = skills;
    });
  }

  initform() {
    getStorage('id').then( candidateId => {
      this.addData = new FormGroup({
        // id : new FormControl(''),//no se usa
        cv_id: new FormControl(candidateId),
        skill_list_id: new FormControl(''),
        skill: new FormControl('', [Validators.required]),
      });
    });
  }
  asignar(data: string, id: string) {
    this.textFinder = data;
    this.valend = 0;
    this.valstart = 0;
    this.addData.get('skill').setValue(this.textFinder);
  }

  find(event) {
    if (this.valstart === 0) {
      this.valstart = 1;
    } else {
      this.valend = 5;
      this.textFinder = event.detail.value;
      this.addData.get('skill').setValue(this.textFinder);
    }
  }

  async add(text: string) {


    if (text === '') {
      return;
    }
    const mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">`;
    const header = '¿Desea guardar esta aptitud?';
    const alert = await this.uiService.presentAlert('', header, mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();
    if (data.role !== 'ok') {
      return;
    }
    if (text.trim() === '') {
      this.textFinder = '';
    } else {
      // si hay texto
      text = text.toLowerCase().trim();
      // descarga de nuevo las skill para tener los agregados recientes
      this.cvsKillService.getSkillListComplete().subscribe(skills => {
        const skillsadd = skills;

        // filtra el arreglo buscando el valor del texto
        const aux: Skill[] = skillsadd.filter(item => { if (item.skill.toLowerCase() === text) { return true; } else { return false; } });
        // verifica si lo encuentra en la lista de skills
        if (aux.length !== 0) {
          // si existe
          this.addData.get('skill_list_id').setValue(aux[0].id); // le pone el id al addData

          this.cvsKillService.getCvSkillExist(this.addData.get('cv_id').value, this.addData.get('skill_list_id').value)
            .subscribe(async cvskill => {
              // verifica si el usuario tiene agregado la skill
              if (cvskill[0] == 1) {
                // si lo tiene lo regresa a la pagina de skills
                this.navCtrl.navigateRoot('/mi-perfil/home/aptitudes');
              }
              else {
                // no lo tiene -> se lo agrega
                const loading = await this.uiService.presentLoading('Agregando...', 'loading', false);
                this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
                  this.addData.get('skill_list_id').value,
                  this.addData.get('skill').value).pipe(
                    finalize(async () => {
                      await loading.dismiss();
                      setTimeout(() => {
                        this.navCtrl.navigateRoot('/mi-perfil/home/aptitudes', { animationDirection: 'back' });
                        document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
                      }, 500);
                    })
                  ).subscribe(() => {
                  });
              }
            });
        } else {
          // no existe-> lo agrega a la lista de skills
          //agregar presentLoading
          this.addData.get('skill_list_id').setValue(''); // le coloca en vacio el id al addData
          this.cvsKillService.addSkill(this.addData.get('skill').value).pipe(
          ).subscribe(cvskill => {
            // ejecuta de nuevo la funcion
            this.addedSkill(text);
          });

        }
      });
    }
  }

  addedSkill(text) {
    // si hay texto
    text = text.toLowerCase().trim();
    // descarga de nuevo las skill para tener los agregados recientes
    this.cvsKillService.getSkillListComplete().subscribe( async skills => {
      const skillsadd = skills;
      // filtra el arreglo buscando el valor del texto
      const aux: Skill[] = skillsadd.filter(item => {
        if (item.skill.toLowerCase() === text) {
          return true;
        } else {
          return false;
        }
      });
      // verifica si lo encuentra en la lista de skills
      if (aux.length !== 0) {
        // si existe
        this.addData.get('skill_list_id').setValue(aux[0].id); // le pone el id al addData

        this.cvsKillService.getCvSkillExist(this.addData.get('cv_id').value, this.addData.get('skill_list_id').value)
          .subscribe(cvskill => {
            // verifica si el usuario tiene agregado la skill
            if (cvskill[0] === 1) {
              // si lo tiene lo regresa a la pagina de skills
              this.navCtrl.navigateRoot('/mi-perfil/home/aptitudes');
            }
            else {
              // no lo tiene -> se lo agrega
              this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
                this.addData.get('skill_list_id').value,
                this.addData.get('skill').value).subscribe(() => {
                  this.navCtrl.navigateRoot('/mi-perfil/home/aptitudes');
                });
            }
          });
      } else {
        let mssge = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
        let headere = 'Lo sentimos, no se puede agregar esta aptitud';
        let alerte = await this.uiService.presentAlert2('', headere, mssge, 'alertCancel', 'alertButton', 'ios');
        let datae = await alerte.onDidDismiss();
      }


    });
  }





}
