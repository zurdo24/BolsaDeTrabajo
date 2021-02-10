import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrganizationUnit } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService {
  URL = environment.url;
  constructor(private http: HttpClient) {
   }

  getOrganizationUnit(id: string){
    return this.http.get<OrganizationUnit>(`${this.URL}/api/organization-units/${id}`);
  }

  getOrganizationUnits() {
    return this.http.get<OrganizationUnit>(`${this.URL}/api/organization-units`);
  }
}
