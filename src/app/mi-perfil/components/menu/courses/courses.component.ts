import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/mi-perfil/services/course.service';
import { Course } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import { NavController } from '@ionic/angular';
import { getStorage } from 'src/app/shared/services/storage.service';
import { DisconnectedService } from './../../../../shared/services/disconnected.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  confirm: string ;
  course: Course;
  constructor(private courseService: CourseService, private uiService: UiService
    , private disccService: DisconnectedService, private navCtrl: NavController) { }

  ionViewWillEnter(){
    this.disccService.seturl('/mi-perfil/home/courses')
  }
  ngOnInit() {

    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    getStorage('id').then( candidateId => {
      this.courseService.getCoursesComplete(candidateId).subscribe( course => {
        this.course = course;
      });
    });
  }

  doRefresh(event) {
    getStorage('id').then( candidateId => {
      this.courseService.getCoursesComplete(candidateId).pipe(
        finalize(async () => {
          event.target.complete();
        })
      ).subscribe( course => {
        this.course = course;
        });
    });
  }
  async opcionesCursos(id: string){
    const aSheet = await this.uiService.presentActionSheet();
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    if (data.role === 'edit'){
      this.navCtrl.navigateRoot(`/mi-perfil/home/courses/edit/${id}`, { animationDirection: 'forward' });
      document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    }

    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar este curso de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');

      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.courseService.deleteCourse(id).pipe(
          finalize(async () => {
            this.ngOnInit();
          })
        ).subscribe(() => {

        });
      }
    }
  }
  onClick() {
    this.navCtrl.navigateRoot('/mi-perfil/home/courses/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }
}
