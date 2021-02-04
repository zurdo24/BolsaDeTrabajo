import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicTraining, Education } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }
  getEducation(id: string): Observable <object> {
    return this.http.get<AcademicTraining[]>(`${this.URL}/api/education/search/?id=${id}`);
  }
  getEducationById(id: string) {
    return this.http.get<Education>(`${this.URL}/api/educations/${id}`);
  }
  createEducation(data: any): Observable <object> {
    return this.http.post(`${this.URL}/api/educations`, data);
  }
  updateEducation(id: string, data: any): Observable <object> {
    return this.http.put(`${this.URL}/api/educations/${id}`, data);
  }
  DeleteEducation(id: string): Observable <object> {
    return this.http.delete(`${this.URL}/api/educations/${id}`);
  }

  getEducationVacants(id: string) {
    return this.http.get<AcademicTraining[]>(`${this.URL}/api/education/get-form-academic/?id=${id}`);
  }

}
