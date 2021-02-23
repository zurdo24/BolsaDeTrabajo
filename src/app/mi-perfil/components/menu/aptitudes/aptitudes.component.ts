import { Component, OnInit } from '@angular/core';
import { CvSkillComplete } from 'src/app/shared/interfaces';
import { CvService } from 'src/app/shared/services/cv.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { getStorage } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.scss'],
})
export class AptitudesComponent implements OnInit {
  cvSkill: CvSkillComplete;

  constructor(private cvSkillService: CvService, private uiService: UiService, private navCtrl: NavController) { }

  ngOnInit() {
    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    getStorage('id').then( candidateId => {
      this.cvSkillService.getCvSkillComplete(candidateId).subscribe( cvskill => {
        this.cvSkill = cvskill;
      });
    });
  }
  async opcionesAptitud(id: string, skill_list_id: string) {
    const aSheet = await this.uiService.presentActionSheet2('Opciones', 'Eliminar', 'delete', 'trash', 'delete-btn');
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    // if (data.role === 'edit'){
    //   this.navCtrl.navigateForward(`/mi-perfil/home/aptitudes/edit/${skill_list_id}`, { animationDirection: 'forward' });
    //   document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    // }
    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar esta aptitud de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');

      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.cvSkillService.deleteCvSkill(id, skill_list_id).pipe(
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
      this.cvSkillService.getCvSkillComplete(candidateId).pipe(
        finalize(async () => {
          event.target.complete();
        })
      ).subscribe( cvskill => {
        this.cvSkill = cvskill;
      });
    });
  }
  onClick(){
    this.navCtrl.navigateRoot('/mi-perfil/home/aptitudes/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }


}
