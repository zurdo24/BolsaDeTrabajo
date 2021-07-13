import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobsOpening, Match } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningService {
  id: string = null;
  URL = environment.url;
  pageJobs = 0;
  pageJobsFilter = 0;
  constructor(private http: HttpClient) { }

  // retorna una lista de todos los trabajos con estado =1=open
  getJobsListOpen(){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-opening/jobs-open`);
  }

  getJobOpening(id: string){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-openings/${id}`);
  }

  // http://localhost:8080/api/job-opening/is-open/?id=64
  getIsOpen(id: string){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-opening/is-open/?id=${id}`);
  }

  jobsMatch(data: any) {
    return this.http.post<Match>(`${this.URL}/api/job-opening/jobs-match`, data);
  }

  // regresa todos los trabajos abiertos
  getJobsOpen(pull: boolean = false){
    if ( pull ) {
      this.pageJobs = 1;
    }
    this.pageJobs++;
    return this.http.get<JobsOpening[]>(`${this.URL}/api/job-opening/jobs-open2?page=${ this.pageJobs}`);
  }

  searchJobOpen(text: string) {
    return this.http.get<JobsOpening[]>(`${this.URL}/api/job-opening/search?text=${text}`);
  }
  // para el filtro con valores especificados
  searchJobOpenFilter(pull: boolean = false, data: any) {
    if ( pull ) {
      this.pageJobsFilter = 1;
    }
    this.pageJobsFilter++;
    console.log(this.pageJobsFilter);
    return this.http.post<JobsOpening[]>(`${this.URL}/api/job-opening/searchjobopening?page=${this.pageJobsFilter}`, data);
  }
  setPageJobsFilter(pageJobsFilter: number) {
    this.pageJobsFilter = pageJobsFilter;
  }
  setpageJobs(pageJobs: number) {
    this.pageJobs = pageJobs;
  }
  // regresa los trabajos abiertos con base al criterio de busqueda
}
