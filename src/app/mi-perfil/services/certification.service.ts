import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certification } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCertifications(id: string): Observable <object> {
    return this.http.get<Certification>(`${this.URL}/api/certification/find-by-cv/?cvId=${id}`);
  }
  getCertificationByIdCertification(id: string) {
    return this.http.get<Certification>(`${this.URL}/api/certifications/${id}`);
  }
  createCertification(data: any) {
    return this.http.post(`${this.URL}/api/certifications`, data);
  }

  DeleteCertification(id: string) {
    return this.http.post(`${this.URL}/api/certification/delete-certification?id=${id}`, null);
  }

  updateCertification(id: string, data: any) {
    return this.http.post(`${this.URL}/api/certification/update-certification/?id=${id}`, data);
  }
}
