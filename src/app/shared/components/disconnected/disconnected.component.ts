import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { getStorage } from '../../services/storage.service';
import { UiService } from '../../services/ui.service';
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
	constructor(private http: HttpClient, private navCtrl: NavController,
				private uiService: UiService, private disscService: DisconnectedService) {
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
			console.log(res,this.disscService.getUrl());

			if (res) {
				if (this.disscService.getUrl()==undefined)
				{
					this.disscService.seturl('login')
				}
				this.connectedDB = true;
				this.navCtrl.navigateRoot( this.disscService.getUrl() , { animationDirection: 'forward' });

			}

			// if (this.connectedDB) {

				// this.navCtrl.navigateRoot( this.disscService.getUrl() , { animationDirection: 'forward' });
			// }

		}, 
		 async error => {
			console.log("ERROR")
			let mssg = `<img src="./assets/alerts/alert.png" class="card-alert-img">`;
			// let header = '';
			
				// console.log("el servidor no se encuentra disponible")
				let header = 'No se ha podido reconectar con el servidor , por favor inténtelo más tarde.';
				let alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
				let data = await alert.onDidDismiss();
			
			}
		);

	}

	prueba() {
		this.navCtrl.navigateRoot('/prueb', { animated: true });
	}
}
