import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { StudyProgrammeService } from 'src/app/mi-perfil/services/study-programme.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { JobType, StudyPrograme, SubjectArea } from '../../interfaces';
import { JobTypeService } from '../../services/job-type.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-pop-filter',
  templateUrl: './pop-filter.component.html',
  styleUrls: ['./pop-filter.component.scss'],
})
export class PopFilterComponent implements OnInit {
  jobType: JobType;
  studyPrograme: StudyPrograme;
  subjectArea: SubjectArea;
  findData: FormGroup;
  years = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

  constructor(private jobTypeService: JobTypeService,
              private subjectAreaService: SubjectAreaService,
              private studyProgrammeService: StudyProgrammeService,
              private popoverCtrl: PopoverController,
              public navParams: NavParams, private uiService: UiService) {
                this.initForm();
               }

  ngOnInit() {
    this.jobTypeService.getJobsListType().subscribe( jobType => {
      this.jobType = jobType;
      this.subjectAreaService.getSubjectAreas().subscribe( subjectArea => {
        this.subjectArea = subjectArea;
        this.studyProgrammeService.getallStudyProgramme().pipe(
          finalize(async () => {
            this.findData.setValue( this.uiService.dataFilter.value);
            this.findData.updateValueAndValidity();
          })
        ).subscribe(studyPrograme => {
          this.studyPrograme = studyPrograme;
        });
      });
    });
  }

  changeProgramme(event){
    this.studyProgrammeService.getStudyProgrammeBySubjectArea(event.detail.value).subscribe( studyPrograme => {
      this.studyPrograme = studyPrograme;
      this.findData.get('study_programme_id').setValue('');
    });
  }

  find(){
    if (this.findData.get('years_experience').value === '' &&  this.findData.get('job_type_id').value === ''
        && this.findData.get('city_id').value === '' &&  this.findData.get('study_programme_id').value === ''
        && this.findData.get('subject_area_id').value === '' &&  this.findData.get('salary').value === ''
        ) {
      console.log('entra');
      this.popoverCtrl.dismiss({
        data: 'error'
      });
    }
    this.uiService.dataFilter.setValue(this.findData.value);
    this.popoverCtrl.dismiss({
      data: 'ok'
    });
  }

  cancel(){
    this.popoverCtrl.dismiss({
      data: 'clean'
    });
  }

  initForm() {
    this.findData = new FormGroup({
      years_experience: new FormControl(''),
      job_type_id: new FormControl(''),
      city_id: new FormControl(''),
      study_programme_id: new FormControl(''),
      subject_area_id: new FormControl(''),
      salary: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }


}
