import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UiService } from './../../../shared/services/ui.service';
import { NavController } from '@ionic/angular';
import { getStorage } from '../../services/storage.service';

// import { PluginListenerHandle } from '@capacitor/core/dist/esm/web/network'

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
	constructor(private http: HttpClient, private navCtrl: NavController, private uiService: UiService) {
		getStorage('id').then( candidateId => {
			this.id = candidateId;
    });
	}

	async ngOnInit() {
		this.networkListener = Network.addListener('networkStatusChange', (status) => {
			// console.log("Network status changed", status);
			this.networkStatus = status;
		});

		this.networkStatus = await Network.getStatus();
	}

	conectar() {
		// console.log("id",this.id)
		this.http.get(`${this.URL}/api/site/is-connected/?id=` + this.id).subscribe(res => {
			console.log(res);
			if (res) {
				this.connectedDB = true;
			}
			if (this.networkStatus.connected && this.connectedDB) {
				console.log('status', this.networkStatus.connected, 'conectado con aplicacion web', this.connectedDB);
				this.navCtrl.navigateForward('/perfil-basico', { animationDirection: 'back' });
			}

		}, async error => {
			// console.log(this.networkStatus.connected)
			let mssg = `<img src="./assets/alerts/alert.png" class="card-alert-img">`;
			let header = '';
			if (this.networkStatus.connected) {
				// console.log("el servidor no se encuentra disponible")
				header = 'No se ha podido reconectar con el servidor , por favor inténtelo más tarde.';
				let alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
				let data = await alert.onDidDismiss();
			}
			else {
				// console.log("else")
				header = 'Por favor, verifique su conexión con internet.';
				let alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
				let data = await alert.onDidDismiss();
			}

		});

	}

	ionViewDidLeave() {
		this.networkListener.remove();
	}

}
