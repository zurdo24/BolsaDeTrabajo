import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusEducation } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusEducationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getStatusEducations() {
    return this.http.get<StatusEducation>(`${this.URL}/api/status-educations`);
  }
}
