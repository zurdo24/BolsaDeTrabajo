import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpeningLanguage } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningLanguageService {
  URL = environment.url;
  constructor(private http: HttpClient) { }
  
  // http://localhost:8080/api/opening-language/opening-languages/?id=6092
  getOpeningLanguage(id: string) {
    return this.http.get<OpeningLanguage>(`${this.URL}/api/opening-language/find-by-job-opening/?jobOpeningId=${id}`);
  }
}
