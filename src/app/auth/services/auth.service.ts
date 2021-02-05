import { UserService } from './../../perfil-basico/services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { clearStorage, removeStorage, setStorage } from 'src/app/shared/services/storage.service';
import { User } from 'src/app/shared/interfaces';
import { CandidateService } from 'src/app/perfil-basico/services/candidate.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL = environment.url;
  constructor(private http: HttpClient, private userService: UserService, private candidateService: CandidateService) { }

  login(username: string, password: string) {
    const data = { username, password };

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/user/login`, data).subscribe(resp => {
        if (resp['login']) {
          if (!resp['user'].match('candidate')) {
            resolve('no es candidato');
            return;
          }
          setStorage('id', resp['id']);
          setStorage('token', resp['token']);
          this.userService.getUser(resp['id']).subscribe(user => {
            setStorage('user', user);
            // this.candidateService.getCandidate(resp['id']).subscribe(candidate => {
            //   setStorage('candidate', candidate);
            //   setStorage('id', resp['id']);
            //   resolve(true);
            // });
            resolve(true);
          });
        } else {
          localStorage.clear();
          resolve(false);
        }

      });
    });
  }
}
