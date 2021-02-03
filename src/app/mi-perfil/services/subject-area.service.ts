import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectArea } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectAreaService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getSubjectAreas() {
    return this.http.get<SubjectArea>(`${this.URL}/api/subject-areas`);
  }

  getSubjectArea(id: string) {
    return this.http.get<SubjectArea>(`${this.URL}/api/subject-areas/${id}`);
  }
}
