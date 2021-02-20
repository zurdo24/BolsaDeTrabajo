import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseMode } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseModeService {
  	URL = environment.url;

	constructor(private http: HttpClient) { }

	// regresa la lista de modos de cursos
	getCourseMode(){
	    return this.http.get<CourseMode>(`${this.URL}/api/course-modes`);
	}
}
