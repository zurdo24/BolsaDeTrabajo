import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController, NavParams } from '@ionic/angular';
import { StudyProgrammeService } from 'src/app/mi-perfil/services/study-programme.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { JobType, StudyPrograme, SubjectArea } from '../../interfaces';
import { JobTypeService } from '../../services/job-type.service';

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
              public navParams: NavParams) {
                this.initForm();
               }

  ngOnInit() {
    this.jobTypeService.getJobsListType().subscribe( jobType => {
      this.jobType = jobType;
    });
    this.subjectAreaService.getSubjectAreas().subscribe( subjectArea => {
      this.subjectArea = subjectArea;
    });
    this.studyProgrammeService.getallStudyProgramme().subscribe(studyPrograme => {
      this.studyPrograme = studyPrograme;
    });

    this.findData = new FormGroup({
      year_Experience: new FormControl(this.navParams.get('year_Experience')),
      job_Type: new FormControl(this.navParams.get('job_Type')),
      city: new FormControl(this.navParams.get('city')),
      subject_Area: new FormControl(this.navParams.get('subject_Area')),
      study_Programe: new FormControl(this.navParams.get('study_Programe')),
      sueldo: new FormControl(this.navParams.get('sueldo'), [ Validators.pattern('^[0-9]*$')])
    });
  }

  changeProgramme(event){
    this.studyProgrammeService.getStudyProgrammeBySubjectArea(event.detail.value).subscribe( studyPrograme => {
      this.studyPrograme = studyPrograme;
      this.findData.get('study_Programe').setValue('');
    });
  }

  find(){
    // console.log(this.findData.value)
    this.popoverCtrl.dismiss({
      year_Experience: this.findData.get('year_Experience').value,
      job_Type: this.findData.get('job_Type').value,
      city: this.findData.get('city').value,
      subject_Area: this.findData.get('subject_Area').value,
      study_Programe: this.findData.get('study_Programe').value,
      sueldo: this.findData.get('sueldo').value,
    });
  }

  cancel(){
    this.findData.get('year_Experience').setValue('');
    this.findData.get('job_Type').setValue('');
    this.findData.get('city').setValue('');
    this.findData.get('subject_Area').setValue('');
    this.findData.get('study_Programe').setValue('');
    this.findData.get('sueldo').setValue('');

    this.popoverCtrl.dismiss({
      // findData:this.findData
      year_Experience: this.findData.get('year_Experience').value,
      job_Type: this.findData.get('job_Type').value,
      city: this.findData.get('city').value,
      subject_Area: this.findData.get('subject_Area').value,
      study_Programe: this.findData.get('study_Programe').value,
      sueldo: this.findData.get('sueldo').value,
    });
  }

  initForm() {
    this.findData = new FormGroup({
      year_Experience: new FormControl(''),
      job_Type: new FormControl(''),
      city: new FormControl(''),
      subject_Area: new FormControl(''),
      study_Programe: new FormControl(''),
      sueldo: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }


}
