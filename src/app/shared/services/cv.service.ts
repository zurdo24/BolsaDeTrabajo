import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cv, CvSkillComplete, Skill } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCv(id: string){
    return this.http.get<Cv>(`${this.URL}/api/cvs/${id}`);
  }

  updateCv(id: string, status: string, summary: string): Observable<object> {
    const data = { status, summary };

    return this.http.put<Cv>(`${this.URL}/api/cvs/${id}`, data);
  }

  matchCv(id: string) {
    return this.http.get<any>(`${this.URL}/api/cv/match/?cvId=${id}`);
  }
  // ======================= cvSkills ======================= //
  getCvSkillComplete(id: string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/find-by-cv/?cvId=${id}`);
  }

  getCvSkillExist(cv_id: string, skill_list_id: string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill-exist/?cvId=${cv_id}&skillListId=${skill_list_id}`);
  }

  // agrega un CvSkill a un usuario
  addCvSkill( cv_id: string, skill_list_id: string, skill: string) {
    const data = { cv_id, skill_list_id, skill };
    return this.http.post<CvSkillComplete>(`${this.URL}/api/cv-skills`, data);
  }

  // elimina un skill  http://localhost:8080/api/cv-skill/del-cvskill/?c=86&s=352
  deleteCvSkill(cv_id: string, skill_list_id: string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill/?cvId=${cv_id}&skillListId=${skill_list_id}`);
  }

  // =========== skill-list ================================== //
  // retorna un skill
  getSkill(id: string){
    return this.http.get<Skill>(`${this.URL}/api/skill-lists/${id}`);
  }

// returna una lista de todos los skills
  getSkillListComplete(){
    return this.http.get<Skill[]>(`${this.URL}/api/skill-list/view-list-complete`);
  }
  getSkillExist(skill: string){
    return this.http.get<Skill>(`${this.URL}/api/skill-list/skill-exist/?t=${skill}`);
  }

  // agrega un Skilla un usuario
  addSkill(  skill: string) {
    const data = {  skill };
    return this.http.post<Skill>(`${this.URL}/api/skill-lists`, data)
  }

}
