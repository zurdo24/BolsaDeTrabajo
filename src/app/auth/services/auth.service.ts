import { UserService } from './../../perfil-basico/services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { clearStorage, removeStorage, setStorage } from 'src/app/shared/services/storage.service';
import { User, Password_recovery } from 'src/app/shared/interfaces';
import { CandidateService } from 'src/app/perfil-basico/services/candidate.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL = '';
  constructor(private http: HttpClient, private userService: UserService, private candidateService: CandidateService) {
  }

  login(username: string, password: string) {
    this.userService.setUrl(this.URL);
    const data = { username, password };

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/site/login`, data).subscribe(resp => {
        if (resp['login']) {
          if (!resp['user'].match('candidate')) {
            resolve('no es candidato');
            return;
          }
          setStorage('id', resp['id']);
          setStorage('token', resp['token']);
          this.userService.getUser(resp['id']).subscribe(user => {
            setStorage('user', user);
            resolve(true);
          });
        } else {
          localStorage.clear();
          resolve(false);
        }

      });
    });
  }
  logout(token: string){
    const data = {
      token,
    };
    return this.http.post<any>(`${this.URL}/api/site/logout`, data);
  }

  setUrl(url: string){
    this.URL = url;
  }

  recovery(email: string){
    const data = { email };
    return this.http.post<Password_recovery>(`${this.URL}/api/site/request-password`, data);
  }


}
