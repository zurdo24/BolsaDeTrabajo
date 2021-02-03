import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineBusiness } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineBusinessService {
  URL = environment.url;
  constructor(private http: HttpClient) { }


  getLineBusiness(id: string){
    return this.http.get<LineBusiness>(`${this.URL}/api/line-businesses/${id}`);
  }
// returna una lista de todos los giros de negocio
  getLineBusinesslist(){
    return this.http.get<LineBusiness>(`${this.URL}/api/line-business/view-list-complete`);
  }
}
