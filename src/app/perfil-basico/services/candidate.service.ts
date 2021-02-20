import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  URL = '';
  photoRoutbase: string = this.URL + '/btuady/public_html/files/photo/';
  photoRout = '';
  constructor(private http: HttpClient) { }

  getCandidate(id: string){
    return this.http.get<Candidate>(`${this.URL}/api/candidates/${id}`);
  }

  getPhoto(id: string){
    return this.http.get<Candidate>(`${this.URL}/api/candidate/view-photo/?id=${id}`);
  }

  updateCandidate(id: string, data: any): Observable<object>{
    return this.http.put(`${this.URL}/api/candidates/${id}`, data);
  }

  loadinformation(){
    if(!JSON.parse(localStorage.getItem('_cap_candidate'))){
      return;
    }
    const candidate = JSON.parse(localStorage.getItem('_cap_candidate'));

    if (candidate.photo == null) {
      if (candidate.sex === 'female') {
        this.photoRout = './assets/image/Mujer.png';
      } else {
        this.photoRout = './assets/image/Hombre.png';
      }
    } else {
      this.photoRout = this.photoRoutbase + candidate.photo;
    }
  }
  setUrl(url: string){
    this.URL = url;
  }
}
