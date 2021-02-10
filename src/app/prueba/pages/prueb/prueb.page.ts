import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-prueb',
  templateUrl: './prueb.page.html',
  styleUrls: ['./prueb.page.scss'],
})
export class PruebPage implements OnInit {
	url = environment.url
	urlphotos = environment.urlPhotos
	n1=""
	n2=""
  	constructor(private navCtrl: NavController) { }

	ngOnInit() {	
	}

	change(){
		if (this.n1.trim() != '') {
		environment.url=this.n1
		}
		if (this.n2.trim() != '') {
		environment.urlPhotos=this.n2
		}
		this.url = environment.url
		this.urlphotos = environment.urlPhotos

		this.navCtrl.navigateForward('/login', {animated: true});
	}

}
