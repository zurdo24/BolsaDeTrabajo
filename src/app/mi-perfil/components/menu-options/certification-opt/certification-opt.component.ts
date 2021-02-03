import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from 'src/app/mi-perfil/services/certification.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { Certification, SubjectArea } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import * as moment from 'moment';
moment.locale('es');
@Component({
  selector: 'app-certification-opt',
  templateUrl: './certification-opt.component.html',
  styleUrls: ['./certification-opt.component.scss'],
})
export class CertificationOptComponent implements OnInit {
  idParam: string;
  subjectAreas: SubjectArea;
  createCertication: FormGroup;
  // variables auxiliares para el ion-input date
  DateMin: Date;
  DateMax: string;
  readOnly = true;
  first = false;
  constructor(private route: ActivatedRoute, private subjectAreaService: SubjectAreaService,
              private certificationService: CertificationService, private uiService: UiService) { 
                this.initForm();
              }

  ngOnInit() {
    this.DateMax = moment().format('YYYY-MM-DD');
    this.idParam = this.route.snapshot.paramMap.get('id');
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });

    if (this.idParam != null) {
      const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
      this.certificationService.getCertificationByIdCertification(this.idParam).subscribe(certification => {
        this.dataEdit(certification);
      });
    }
  }
  async submit() {

  }
  dataEdit(certification: Certification) {
    this.createCertication = new FormGroup({
      cv_id: new FormControl(certification.cv_id),
      organization: new FormControl(certification.organization),
      name: new FormControl(certification.name, Validators.required),
      subject_area_id: new FormControl(certification.subject_area_id),
      date_received: new FormControl(certification.date_received),
      date_expire: new FormControl(certification.date_expire),
    });
  }

  initForm() {
    this.createCertication = new FormGroup(  {
      cv_id: new FormControl(),
      organization: new FormControl(),
      name: new FormControl(),
      subject_area_id: new FormControl(),
      date_received: new FormControl(),
      date_expire: new FormControl(),
    });
  }

  minDate($event, dateExpire: any) {
    if (this.first === false) {
      this.first = true;
    } else {
      this.DateMin = $event.target.value;
      dateExpire.value = '';
      this.readOnly = false;
    }
    this.DateMin = $event.target.value;
    this.readOnly = false;
  }

  validendDate(event){
    const dateStart = moment( this.createCertication.controls.date_received.value).format('YYYY-MM-DD');
    const dateEnd = moment(event.detail.value).format('YYYY-MM-DD');
    if ( dateEnd < dateStart ){
    }
    // console.log(event.detail.value);
  }
}
