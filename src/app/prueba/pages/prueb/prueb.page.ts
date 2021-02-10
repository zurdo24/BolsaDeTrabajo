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
		// console.log
		environment.url=this.n1
		environment.urlPhotos=this.n2
		this.url = environment.url
		this.urlphotos = environment.urlPhotos
		// console.log(environment)

		this.navCtrl.navigateForward('/login', {animated: true});
	}

}
