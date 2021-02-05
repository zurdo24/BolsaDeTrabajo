import { finalize } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WorkExperienceService } from 'src/app/mi-perfil/services/work-experience.service';
import { WorkExperience } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  workexperience: WorkExperience;

  constructor( private workExperienceService: WorkExperienceService, private uiService: UiService,
               private navCtrl: NavController) { }

  ngOnInit() {
    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    const id = JSON.parse(localStorage.getItem('_cap_id'));
    this.workExperienceService.getWorkExComplete (id).subscribe( workexperience => {
      this.workexperience = workexperience;
    });
  }
  ionViewDidEnter(){
  }

  doRefresh(event){
    const id = JSON.parse(localStorage.getItem('_cap_id'));
    this.workExperienceService.getWorkExComplete(id).pipe(
      finalize(async () => {
        event.target.complete();
      })
    ).subscribe(workexperience => {
      this.workexperience = workexperience;
    });
  }

  async opcionesExpLab(id: string){
    const aSheet = await this.uiService.presentActionSheet();
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    if (data.role === 'edit'){
      this.navCtrl.navigateRoot(`/mi-perfil/home/work-experience/edit/${id}`, { animationDirection: 'forward' });
      document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    }

    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar esta experiencia de trabajo de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');

      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.workExperienceService.deleteWorkExperience(id).pipe(
          finalize(async () => {
            this.ngOnInit();
          })
        ).subscribe(Response => {

        });
      }
    }
  }
  onClick(){
    this.navCtrl.navigateRoot('/mi-perfil/home/work-experience/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }
}
