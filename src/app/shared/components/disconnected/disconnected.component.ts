import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { getStorage } from '../../services/storage.service';
import { DisconnectedService } from '../../services/disconnected.service';


@Component({
	selector: 'app-disconnected',
	templateUrl: './disconnected.component.html',
	styleUrls: ['./disconnected.component.scss'],
})
export class DisconnectedComponent implements OnInit {

	URL = environment.url;
	connectedDB = false;
	id = '';
	constructor(private http: HttpClient, private navCtrl: NavController, private disscService: DisconnectedService) {
		getStorage('id').then(candidateId => {
			this.id = candidateId;
		});
	}

	ngOnInit() {
		// console.log(this.disscService.getUrl());
		
	}

	conectar() {
		if(!this.id) {
			this.navCtrl.navigateRoot( 'login' , { animationDirection: 'forward' });
			return;
		}
		// console.log("id",this.id)
		this.http.get(`${this.URL}/api/site/is-connected/?id=` + this.id).subscribe(res => {
			console.log(res);
			if (res) {
				this.connectedDB = true;
			}

			if (this.connectedDB) {
				this.navCtrl.navigateForward( this.disscService.getUrl() , { animationDirection: 'forward' });
			}

		});

	}

	prueba() {
		this.navCtrl.navigateRoot('/prueb', { animated: true });
	}
}
