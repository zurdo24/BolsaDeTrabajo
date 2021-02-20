import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UiService } from './../../../shared/services/ui.service';
import { Password_recovery } from 'src/app/shared/interfaces';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
 
  	recovery: Password_recovery
	// data: FormGroup;
  	myForm: FormGroup;

	// email: any

	constructor( private navCtrl: NavController ,private authService: AuthService, public formBuilder: FormBuilder,private uiService: UiService,) { 
		this.myForm = this.formBuilder.group({
			email : new FormControl('',  Validators.compose([
				Validators.required,
				Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$') ]))
		})
	}

  	ngOnInit() {

  	 
  	}
  		
 //  	submitForm() {
 //  		console.log(this.myForm.value)
	// }

	async send(){
		var mssg = `<img src="./assets/alerts/info.png" class="card-alert-img">`;

		const loading = await this.uiService.presentLoading('Procesando...', 'loading', false);

		this.authService.recovery(this.myForm.get('email').value.trim()).subscribe(async res => {
			this.recovery=res
			// console.log(this.recovery)
			// console.log(this.recovery.recovery=="1")
			await loading.dismiss();


			if (this.recovery.recovery=="1"){
	    		const header = 'Se enviarán instrucciones a '+this.recovery.email.trim()+' para reiniciar la contraseña.';
				const alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
		    	const data = await alert.onDidDismiss();
		    	if (data.role === 'ok'){
	            	this.navCtrl.navigateForward('/login', { animationDirection: 'back' });
		    	} 

			}else{
	    		const header = 'El correo ingresado no se encuentra registrado.';
				const alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
	    		const data = await alert.onDidDismiss();
			}

 
 
		},
	      async (error) =>{
	      	mssg = `<img src="./assets/alerts/alert.png" class="card-alert-img">`;
	        const header = 'No se pudo realizar esta operación, por favor inténtelo más tarde.';
			
	      	// finalize(async () => {
            await loading.dismiss();
            setTimeout(async() => {
            	const alert = await this.uiService.presentAlert2('', header, mssg, 'alertCancel', 'alertButton', 'ios');
		    	const data = await alert.onDidDismiss();
		    	if (data.role === 'ok'){
	            	this.navCtrl.navigateForward('/login', { animationDirection: 'back' });
		    	} 
            	}, 500);
          	// })
        })


	}


}
