import { Component, ContentChild, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/perfil-basico/services/user.service';
import { IonInput, NavController } from '@ionic/angular';
import { UiService } from 'src/app/shared/services/ui.service';
import { setStorage } from 'src/app/shared/services/storage.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  user: User;
  userData: FormGroup;

  // ----- Variables para los errores
  userNameminlength = false;
  userNamePattern = false;

  // show password
  isActiveToggleTextPassword = true;
  constructor(private userService: UserService, private uiService: UiService, private navCtrl: NavController) {
    this.initForm();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_cap_user'));

    this.userData = new FormGroup({
      // tslint:disable-next-line: max-line-length
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(128), Validators.pattern('^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9._-]+(?![-_.])$')]),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=^.{7,30}$)((?=.*)(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*$')]),
      password_confirm: new FormControl(),
    });
    this.userData.get('password_confirm').setValidators([
      Validators.required, this.passwordid.bind(this.userData)
    ]);
  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword === true) ? false : true;
  }
  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  async update() {
    const mssg = `<img src="./assets/alerts/war.png" class="card-alert-img">`;
    const header = '¿Desea guardar los cambios?';
    const alert = await this.uiService.presentAlert('', header, mssg, 'alertCancel', 'alertButton', 'ios');
    const data = await alert.onDidDismiss();

    if (data.role !== 'ok') {
      return;
    }
    const load = await this.uiService.presentLoading('Guardando...', 'loading', false);
    this.userService.updateUser(this.user.id, this.userData.value).pipe(
      finalize(async () => {
        // Hide the loading spinner on success or error
        await load.dismiss();
        setTimeout(() => {
          this.navCtrl.navigateForward('/perfil-basico', {animated: true});
        }, 500);
      })
    ).subscribe( (user) => {
      this.user = user;
      setStorage('user', this.user);
    });
  }
  // *********************************************
  // es para comparar contraseñas
  passwordid(control: FormControl): { [s: string]: boolean } {

    const forma: any = this;
    if (control.value !== forma.controls.password.value) {
      return {
        noiguales: true
      };
    }
    return null;
  }
  initForm() {
    this.userData = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      password_confirm: new FormControl(),
    });

  }

  // Para mostrar dialogos de error en alguna validacion
  advertenciaUserData() {
    if (this.userData.get('username').getError('minlength')) {
      this.userNameminlength = true;
    } else {
      this.userNameminlength = false;
    }
    if (this.userData.get('username').getError('pattern')) {
      this.userNamePattern = true;
    } else {
      this.userNamePattern = false;
    }
  }
  changePassword() {
    this.userData.get('password_confirm').setValue('');
    this.userData.get('password_confirm').updateValueAndValidity();
  }

}
