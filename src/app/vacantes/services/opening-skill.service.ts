import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpeningSkill } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningSkillService {
  URL = environment.url;
  constructor(private http: HttpClient) { }
  // returna una lista de todos los skills
  getOpeningSkillComplete(id: string){
    return this.http.get<OpeningSkill>(`${this.URL}/api/opening-skill/opening-skill-complete/?id=${id}`);
  }
}
