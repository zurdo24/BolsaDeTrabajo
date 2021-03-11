import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisconnectedService {
  url: string;
  constructor() { }

  seturl( url: string ) {
  	console.log(url)
    this.url = url;
  }

  getUrl() {
    return this.url;
  }
}
