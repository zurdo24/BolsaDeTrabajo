import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UiService } from './../../../shared/services/ui.service';
import { NavController } from '@ionic/angular';
import { getStorage } from '../../services/storage.service';

// import { PluginListenerHandle } from '@capacitor/core/dist/esm/web/network'
import { DisconnectedService } from '../../services/disconnected.service';

const { Network } = Plugins;

@Component({
	selector: 'app-disconnected',
	templateUrl: './disconnected.component.html',
	styleUrls: ['./disconnected.component.scss'],
})
export class DisconnectedComponent implements OnInit {
	networkStatus: NetworkStatus;
	networkListener: PluginListenerHandle;
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
