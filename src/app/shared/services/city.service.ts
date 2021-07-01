import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCity(id: string){
    return this.http.get<City>(`${this.URL}/api/cities/${id}`);
  }
  getCities() {
    return this.http.get<City>(`${this.URL}/api/cities`);
  }

  // regresa una lista de ciudades de acuerdo a la id de estado
  getCitiesByState(id: string) {
    return this.http.get<City>(`${this.URL}/api/city/cities-by-state/?stateId=${id}`);
  }
}
