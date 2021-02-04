import { Component, OnInit } from '@angular/core';
import { CertificationService } from 'src/app/mi-perfil/services/certification.service';
import { SubjectAreaService } from 'src/app/mi-perfil/services/subject-area.service';
import { Certification } from 'src/app/shared/interfaces';
import { UiService } from '../../../../shared/services/ui.service';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit {
  certifications: Certification;
  subjectAreas: SubjectAreas;
  // para las opciones de certificaciones
  constructor(private certificationService: CertificationService, private subjectAreaService: SubjectAreaService,
              private uiService: UiService, private navCtrl: NavController) { }

  ngOnInit() {
    document.getElementById('tabs').classList.remove('hidden', 'scale-out-center');
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });

    const candidateId = JSON.parse( localStorage.getItem('_cap_id'));
    this.certificationService.getCertifications(candidateId).subscribe(certifications => {
      this.certifications = certifications;
    });
  }
  async opcionesCertifications(id: string) {
    const aSheet = await this.uiService.presentActionSheet();
    const { data } = await aSheet.onDidDismiss();
    if (!data) {
      return;
    }

    if (data.role === 'edit'){
      this.navCtrl.navigateForward(`/mi-perfil/home/certification/edit/${id}`, { animationDirection: 'forward' });
      document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
    }

    if (data.role === 'delete') {
      const aSheet2 = await this.uiService.presentActionSheet2('¿Desea Eliminar esta certificación de forma permanente?', 'Eliminar', 'delete', 'trash', 'delete-btn');
      const  data2 = await aSheet2.onDidDismiss();
      if (!data2.data){
        return;
      }
      if (data2.data.role === 'delete'){
        this.certificationService.DeleteCertification(id).pipe(
          finalize(async () => {
            this.ngOnInit();
          })
        ).subscribe(() => {

        });
      }
    }

  }
  doRefresh(event) {
    const id = JSON.parse(localStorage.getItem('_cap_id'));
    this.certificationService.getCertifications(id).pipe(
      finalize(async () => {
        event.target.complete();
      })
    ).subscribe(certifications => {
      this.certifications = certifications;
    });
  }
  onClick() {
    this.navCtrl.navigateRoot('/mi-perfil/home/certification/add', { animationDirection: 'forward' });
    document.getElementById('tabs').classList.add('hidden', 'scale-out-center');
  }
}



interface SubjectAreas {
  id?: string;
  cv_id?: string;
  organization?: string;
  name?: string;
  subject_area_id?: string;
  date_received?: string;
  date_expire?: string;
}
