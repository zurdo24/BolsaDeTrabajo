import { UiService } from './../../../../shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/mi-perfil/services/course.service';
import { Course } from 'src/app/shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-courses-opt',
  templateUrl: './courses-opt.component.html',
  styleUrls: ['./courses-opt.component.scss'],
})
export class CoursesOptComponent implements OnInit {

  course: Course;
  maxDate1: string;
  minDate2: string;
  maxDate2: string;
  // ----- formato para almacenar la informacion a actualizar------
  data: FormGroup;
  // --------------------------------------------------------------
  isUpdate = false;
  title: string;
  constructor(private route: ActivatedRoute,  private uiService: UiService,
              private courseService: CourseService, private navCtrl: NavController ) {
                this.initForm();
               }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.maxDate1  = this.maxDate2 = this.getNowDate();
    this.minDate2 = ('1970');
    if (id){
      this.title = 'Editar Curso';
      this.courseService.getCourse(id).subscribe( course => {
        this.course = course;
        this.initdataEdit();
      });
      this.isUpdate = true;
    } else {
      this.title = 'Añadir Curso';
      const cvId = JSON.parse( localStorage.getItem('_cap_id'));
      this.data.get('cv_id').setValue(cvId);
    }
  }
  async addCourse(){
    const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">  `;
    const alert = await this.uiService.presentAlert('', 'Desea guardar los cambios', mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();

    if (data.role === 'ok') {
      if (this.isUpdate) {
        const loading = await this.uiService.presentLoading('Guardando...', 'loading', false);
        this.courseService.updateCourse(
          this.data.get('id').value,
            this.data.get('name').value,
            this.data.get('hours').value.toString() ,
            this.data.get('institution').value,
            this.data.get('mode').value,
            this.data.get('start').value,
            this.data.get('end').value,
        ).pipe(
          finalize(async () => {
            await loading.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateForward('/mi-perfil/home/courses', { animationDirection: 'back' });
              document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
            }, 500);
          })
        ).subscribe(() => { });
        return;
      }
      const load = await this.uiService.presentLoading('Guardando...', 'loading', false);
      this.courseService.addCourse(
        this.data.get('cv_id').value,
        this.data.get('name').value,
        this.data.get('hours').value,
        this.data.get('institution').value,
        this.data.get('mode').value,
        this.data.get('start').value,
        this.data.get('end').value,
      ).pipe(
        finalize(async () => {
          await load.dismiss();
          setTimeout(() => {
            this.navCtrl.navigateForward('/mi-perfil/home/courses', { animated: true });
            document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
          }, 500);
        })
      ).subscribe(() => { });
    }

  }
  // le asigna las fechas correspondientes a year_start y month_start
  onChangeStart($event) {
    this.minDate2 = this.data.get('start').value;
    this.data.get('start').setValue(this.data.get('start').value.substr(0, 10));
  }
  // le asigna las fechas correspondientes a year_end y month_end
  onChangeEnd($event) {
    this.maxDate1 = this.data.get('end').value;
    this.data.get('end').setValue(this.data.get('end').value.substr(0, 10));
  }

  getNowDate(){
    const date = new Date(); // Fecha actual
    const monthN = date.getMonth() + 1; // obteniendo mes
    const dayN = date.getDate(); // obteniendo dia
    const year = date.getFullYear(); // obteniendo año
    let day;
    let month;
    if (dayN < 10) {
      day = '0' + dayN;
    } // agrega cero si el menor de 10
    else {
      day = dayN;
    }
    if (monthN < 10) {
      month = '0' + monthN;
    } // agrega cero si el menor de 10
    else {
      month = monthN;
    }
    return year + '-' + month + '-' + day;
  }

  initForm() {
    // this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val);})
    this.data = new FormGroup({
    id : new FormControl(''),
    cv_id: new FormControl(''),
    name: new FormControl(''),
    hours: new FormControl(''),
    institution: new FormControl(''),
    mode: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    });
  }

  initdataEdit(){

    this.data = new FormGroup({
      id : new FormControl(this.course.id),
      cv_id: new FormControl(this.course.cv_id),
      name: new FormControl(this.course.name, [ Validators.required, Validators.maxLength(175)]),
      hours: new FormControl(this.course.hours, [ Validators.pattern('^[0-9]*$'), Validators.maxLength(3)]),
      institution: new FormControl(this.course.institution),
      mode: new FormControl(this.course.mode),
      start: new FormControl(this.course.start),
      end: new FormControl(this.course.end),
    });
  }

}
