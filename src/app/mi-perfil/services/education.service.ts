import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicTraining, Education } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }
  getEducation(id: string): Observable <object> {
    return this.http.get<AcademicTraining[]>(`${this.URL}/api/education/find-by-cv/?cvId=${id}`);
  }
  getEducationById(id: string) {
    return this.http.get<Education>(`${this.URL}/api/educations/${id}`);
  }
  createEducation(data: any): Observable <object> {
    return this.http.post(`${this.URL}/api/educations`, data);
  }
  updateEducation(id: string, data: any): Observable <object> {
    // console.log(id,data);
    // httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    // httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post(`${this.URL}/api/education/update-education?id=${id}`, data );
  }
  DeleteEducation(id: string): Observable <object> {
    return this.http.post(`${this.URL}/api/education/delete-education?id=${id}`, null);
  }

  getEducationVacants(id: string) {
    return this.http.get<AcademicTraining[]>(`${this.URL}/api/education/form-academic-by-cv/?cvId=${id}`);
  }

}
