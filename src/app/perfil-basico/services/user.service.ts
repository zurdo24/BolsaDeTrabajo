import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getUser(id: string) {
    const tokenn =  localStorage.getItem('token');
    return this.http.get<User>(`${this.URL}/api/users/${id}`);
  }

  updateUser(id: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.URL}/api/users/${id}`, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
