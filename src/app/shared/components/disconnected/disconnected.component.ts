import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController,MenuController } from '@ionic/angular';
import { getStorage } from '../../services/storage.service';
import { UiService } from '../../services/ui.service';
import { DisconnectedService } from '../../services/disconnected.service';
// import { MenuComponent } from './../../../shared/components/menu/menu.component';
import { AppComponent } from 'src/app/app.component';
import { Candidate } from 'src/app/shared/interfaces';



@Component({
	selector: 'app-disconnected',
	templateUrl: './disconnected.component.html',
	styleUrls: ['./disconnected.component.scss'],
})
export class DisconnectedComponent implements OnInit {
    URLp = environment.urlPhotos;
	photoRoutbase: string = this.URLp + '/btuady/public_html/files/photo/';

	URL = environment.url;
	connectedDB = false;
	id = '';
	candidate:Candidate;
	constructor(private http: HttpClient, private navCtrl: NavController,
				private uiService: UiService,
				private menuCtrl: MenuController,
				private appComponent: AppComponent,
				private disscService: DisconnectedService) {
		getStorage('id').then(candidateId => {
			this.id = candidateId;
		});
    	getStorage('candidate').then( cand => {
    		this.candidate=cand;
    	})

	}
	ionViewWillEnter() {
	    this.menuCtrl.enable(false);
  	}
  	
    	
  	
	ngOnInit() {
		// console.log(this.disscService.getUrl());
		
	}

	conectar() {
		if(!this.id) {
			this.navCtrl.navigateRoot( '/login' , { animationDirection: 'forward' });
			return;
		}
		// console.log("id",this.id)
		this.http.get(`${this.URL}/api/site/is-connected/?id=` + this.id).subscribe(res => {
			// console.log(res,this.disscService.getUrl());

			if (res) {

				if (this.disscService.getUrl()==undefined )
				{
					this.disscService.seturl('/perfil-basico')
				}
				
				if ( this.disscService.getUrl() != '/login')
				{					
					this.menuCtrl.enable(true);
				}
				// if (this.disscService.getUrl()!='/perfil-basico')
				// {
					//carga foto 
					// console.log("NO ENTRO EN perfil-basico")
					// if (this.candidate.photo == null) {
					    
				 //      	if(this.candidate.sex=="male"){
				 //      		this.candidate.sex="Hombre"
				 //      	}
				 //      	else{
				 //      		this.candidate.sex="Mujer"
				 //      	}

				 //    	this.appComponent.setphotoRout('./assets/image/' + this.candidate.sex + '.png');
				 //    } else {
				 //      	// this.photoRout = this.photoRoutbase + this.candidate.photo;
				 //        this.appComponent.setphotoRout(this.photoRoutbase + this.candidate.photo);
    	// 			}
				// }
				this.connectedDB = true;
				this.navCtrl.navigateRoot( this.disscService.getUrl() , { animationDirection: 'forward' });

			}

			// if (this.connectedDB) {

				// this.navCtrl.navigateRoot( this.disscService.getUrl() , { animationDirection: 'forward' });
			// }

		}, 
		 async error => {
			// console.log("ERROR")
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
		// console.log(this.appComponent.photoRout)
		this.navCtrl.navigateRoot('/prueb', { animated: true });
	}
}
