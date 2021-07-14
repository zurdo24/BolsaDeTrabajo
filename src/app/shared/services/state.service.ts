import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getState(id: string){
    return this.http.get<State>(`${this.URL}/api/states/${id}`);
  }

  // regresa una lista de estados que tienen la id del pais
  getStateByCountry(id: string) {
    return this.http.get<State[]>(`${this.URL}/api/state/lists/?id=${id}`);
  }
}
