import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cv } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCv(id: string){
    return this.http.get<Cv>(`${this.URL}/api/cvs/${id}`);
  }

  updateCv(id: string, status: string, summary: string): Observable<object> {
    const data = { status, summary };

    return this.http.put<Cv>(`${this.URL}/api/cvs/${id}`, data);
  }

  matchCv(id: string) {
    return this.http.get<any>(`${this.URL}/api/cv/match/?id=${id}`);
  }
}
