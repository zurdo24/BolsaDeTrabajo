import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getOrganization(id: string){
    return this.http.get<Organization>(`${this.URL}/api/organizations/${id}`);
  }

  getLogo(id: string){
    return this.http.get<Organization>(`${this.URL}/api/organization/view-logo/?id=${id}`);
  }
}
