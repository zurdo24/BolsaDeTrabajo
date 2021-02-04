import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOpeningStatus } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningStatusService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  // returna una lista de todos los trabajos con estado =1=open
  getJobOpeningStatus(id: string){
    return this.http.get<JobOpeningStatus>(`${this.URL}/api/job-opening-statuses/${id}`);
  }
}
