import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCountry(id: string){
    return this.http.get<Country>(`${this.URL}/api/countries/${id}`);
  }
  getCountries() {
    return this.http.get<Country>(`${this.URL}/api/countries`);
  }
}
