import { UiService } from './../../../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AcademicTraining } from 'src/app/shared/interfaces';
import { EducationService } from '../../../services/education.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-academic-training',
  templateUrl: './academic-training.component.html',
  styleUrls: ['./academic-training.component.scss'],
})
export class AcademicTrainingComponent implements OnInit {
  academicTraining: AcademicTraining;
  constructor(private educationService: EducationService, private uiService: UiService, private navCtrl: NavController) { }

  ngOnInit() {
    const id = JSON.parse(localStorage.getItem('_cap_id'));
    this.educationService.getEducation(id).subscribe(academicTraining => {
      this.academicTraining = academicTraining;
    });
  }
  doRefresh(event) {
    const id = JSON.parse(localStorage.getItem('_cap_id'));
    this.educationService.getEducation(id).pipe(
      finalize(async () => {
        event.target.complete();
      })
    ).subscribe(academicTraining => {
      this.academicTraining = academicTraining;
    });
  }
  async opcionesformAcademic(id: string) {
    const aSheet = await this.uiService.presentActionSheet();
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    if (data.role === 'edit'){
      this.navCtrl.navigateForward(`/mi-perfil/home/academic-training/edit/${id}`, { animationDirection: 'forward' });
      document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    }

    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar esta experiencia de trabajo de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');

      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.educationService.DeleteEducation(id).pipe(
          finalize(async () => {
            this.ngOnInit();
          })
        ).subscribe(() => {

        });
      }
    }
  }

  onClick(){
    this.navCtrl.navigateForward('/mi-perfil/home/academic-training/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }

}
