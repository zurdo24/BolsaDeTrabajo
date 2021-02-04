import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  URL = environment.url;

  constructor(private http: HttpClient) { }

  // agrega un mensaje
  addMessage( from_user_id: string, to_user_id: string, text: string, html_text: string, date_sent: string) {
    if (html_text === ''){
      const data = {from_user_id, to_user_id, text, date_sent};
      return this.http.post<Message>(`${this.URL}/api/messages`, data);
    }
    else {
      const data = {from_user_id, to_user_id, text, html_text, date_sent};
      return this.http.post<Message>(`${this.URL}/api/messages`, data);
    }
  }

    // http://localhost:8080/api/message/get-chat/?s=86&g=105
    // regresa la conversacion entre el contacto y el usuario
    getChat( id: string, contact_id: string){
      return this.http.get<Message>(`${this.URL}/api/message/get-chat/?s=${id}&g=${contact_id}`);
    }

    // actualiza: coloca la fecha a un mensaje que tenga null en su columna date_read
    seeMessages(id: string, date_read: string ) {
      const data = { date_read};
      return this.http.put<Message>(`${this.URL}/api/messages/${id}`, data);
    }

}
