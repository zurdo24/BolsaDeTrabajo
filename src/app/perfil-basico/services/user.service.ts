import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = environment.url;
  constructor(private http: HttpClient) {
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.URL}/api/users/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.URL}/api/users/${id}`, data);
  }
  setUrl(url: string){
    this.URL = url;
  }
}
