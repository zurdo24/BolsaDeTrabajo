import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobApplicationStatusLogs, contactsChat } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationStatusLogService {
  URL = environment.url;

  constructor(private http: HttpClient) { }

  // agrega un mensaje
  addJobASL( cv_id: string, opening_id: string, message_id: string, type: string, text: string) {
    const data = {cv_id, opening_id, message_id,  type, text};
    return this.http.post<JobApplicationStatusLogs>(`${this.URL}/api/job-application-status-logs`, data);
  }

// http://localhost:8080/api/job-application-status-log/is-application/?id=86&job_opening=6092

  getJobASLShow( cv_id: string, job_opening: string) {
    // const data = {cv_id, opening_id, message_id, date, type, text};
  return this.http.get<JobApplicationStatusLogs>(`${this.URL}/api/job-application-status-log/is-application/?id=${cv_id}&job_opening=${job_opening}`);
  }


  // agrega un mensaje
  // http://localhost:8080/api/job-application-status-log/get-list/?id=86
  getContacts(id: string ) {
    return this.http.get<contactsChat>(`${this.URL}/api/job-application-status-log/get-list/?id=${id}`);
  }

  // se utiliza en la pagina de  postulaciones
  // http://localhost:8080/api/job-application-status-log/get-applications/?id=86
  getApplications(id: string ) {
    return this.http.get<contactsChat>(`${this.URL}/api/job-application-status-log/get-applications/?id=${id}`);
  }

}
