import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language, LanguageList, LevelList } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  URL = environment.url;
  constructor(private http: HttpClient) { }


  // http://localhost:8080/api/language/lang-complete/?id=86
  // regresa una lista de los lenguajes de un usuario con el nombre del idioma y el nivel
  getLanguagesComplete(id: string): Observable <object>{
    return this.http.get<Language>(`${this.URL}/api/language/find-languages-by-cv/?cvId=${id}`);
  }

  // regresa 1 si el lenguaje existe y 0 en caso contrario
  getLanguageExist(cv_id: string, language: string){
    return this.http.get<Language>(`${this.URL}/api/language/exist/?cvId=${cv_id}&languageListId=${language}`);
  }

  // regresa una lista de los lenguajes de un usuario solo con los id del idioma y lenguajes
  getLanguages(id: string){
    return this.http.get<Language>(`${this.URL}/api/language/find-by-cv/?cvId=${id}`);
  }

    // regresa un lenguaje de un usuario
    getLanguage(id: string){
      return this.http.get<Language>(`${this.URL}/api/languages/${id}`);
    }

  // agrega un lenguaje a un usuario
  addLanguage(   cv_id: string, language_list_id: string, level_list_id: string) {
    const data = { cv_id, language_list_id, level_list_id};
    return this.http.post<Language>(`${this.URL}/api/languages`, data);
  }

    // actualiza un lenguaje
  updateLanguage(id: string, language_list_id: string, level_list_id: string) {
    const data = { language_list_id, level_list_id };
    return this.http.put<Language>(`${this.URL}/api/languages/${id}`, data);
  }

    // elimina un lenguaje
  deleteLanguage(id: string){
    return this.http.delete<Language>(`${this.URL}/api/languages/${id}`);
  }

  // =========lista de lenguajes ============ //
  getListComplete(){
    return this.http.get<LanguageList>(`${this.URL}/api/language-lists`);
  }

  getLanguageList(id: string){
    return this.http.get<LanguageList>(`${this.URL}/api/language-lists/${id}`);
  }

  // ================= level list ======================= //
  // regresa una lista de los lenguajes
  getLevelListComplete(){
    return this.http.get<LevelList>(`${this.URL}/api/level-lists`);
  }

  getLevel(id: string){
    return this.http.get<LevelList>(`${this.URL}/api/level-lists/${id}`);
  }
}
