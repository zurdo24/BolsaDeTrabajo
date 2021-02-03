import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  load: any;
  data: any;
  constructor(private alertController: AlertController, private navCtrl: NavController,
              public actionSheetController: ActionSheetController, public platform: Platform,
              public loadingController: LoadingController) { }




    // opciones de de editar o eliminar una ___________
  async opcionesMiperfil(page: string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>(resolve => { resolveFunction = resolve; });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          icon: 'Create',
          handler: () => {
            resolveFunction('edit');
            // this.navCtrl.navigateRoot(page);
            this.navCtrl.navigateForward(page); // cambia de pagina con un parametro id
          }
        }, {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            resolveFunction('delete');
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            resolveFunction('cancel');
          }
        }]
    });
    await actionSheet.present();
    return promise;
  }


  // ==================================================
  // alerta con un solo boton ok ||sheader=mensaje || type = alert,war,info||
  // ==================================================

  async AlertaOK(sheader: string, type: string, page: string) {

    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: sheader,
      message: `<img src="./assets/alerts/${type}.png" class="card-alert-img">  `,
      mode: 'ios',
      // message: 'A ocurrido un error al cargar la pagina',
      cssClass: 'alertCancel',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alertButton',
          role: 'ok',
          handler: () => {
            if (page !== '') {
              this.navCtrl.navigateRoot(page);
            }
          }
        }
      ]
      // message:"mensaje"
    });
    await alert.present();
  }


  // ==================================================
  // alerta con DOS botones ok-cancel
  // ==================================================


  // sirve para confirmar el abandonar o no una ventana
  async AlertLeaveOKCANCEL(mensaje: string, type: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      subHeader: mensaje,
      message: `<img src="./assets/alerts/${type}.png" class="card-alert-img">  `,
      mode: 'ios',
      cssClass: 'alertCancel',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'alertButton',
        handler: () => {
          console.log('Confirm Cancel');
          resolveFunction(false);
        }
      }, {
        text: 'Aceptar',
        cssClass: 'alertButton',
        handler: () => {
          if (aceptar !== '') {
            this.navCtrl.navigateRoot(aceptar);
          }
          console.log('Confirm aceptar');
          resolveFunction(true);
        }
      }]
    });

    await alert.present();
    return promise;
  }





  // opcion para confirmar eliminar en mi perfil basico
  async opcionesMiperfilDelete(mensaje: string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>(resolve => { resolveFunction = resolve; });

    const actionSheet = await this.actionSheetController.create({
      header: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            resolveFunction('delete');
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            resolveFunction('cancel');
          }
        }]
    });
    await actionSheet.present();
    return promise;
  }

// === mis opciones ============ //
  async presentLoading(message: string, cssClass: string, translucent: boolean) {
    // Prepare a loading controller
    this.load = await this.loadingController.create({
      message,
      cssClass,
      translucent,
      mode: 'ios'
    });
    // Present the loading controller
    await this.load.present();
    return this.load;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      mode: 'md',
      // cssClass: 'my-custom-class',
      buttons: [ {
        text: 'Editar',
        role: 'edit',
        icon: 'create',
        handler: () => {
          actionSheet.dismiss({
            role: 'edit',
          });
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'delete-btn',
        handler: () => {
          actionSheet.dismiss({
            role: 'delete',
          });
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          actionSheet.dismiss({
          });
        }
      }]
    });
    await actionSheet.present();
    return actionSheet;
  }
  async presentActionSheet2(header: string, textbutton: string, role: string, icon: string, cssClass: string) {
    const actionSheet = await this.actionSheetController.create({
      header,
      mode: 'md',
      // cssClass: 'my-custom-class',
      buttons: [ {
        text: textbutton,
        role,
        cssClass,
        icon,
        handler: () => {
          actionSheet.dismiss({
            role,
          });
        }
      },
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          actionSheet.dismiss({
          });
        }
      }]
    });
    await actionSheet.present();
    return actionSheet;
  }

  async presentAlert(header: string, subHeader: string, message: string, cssClass: string, cssClassBtn: string, mode: any) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      cssClass,
      mode,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: cssClassBtn,
          handler: () => {
           alert.dismiss({

           });
          }
        }, {
          text: 'Aceptar',
          cssClass: 'alertButton',
          role: 'ok',
          handler: () => {
            alert.dismiss({
            });
          }
        }
      ]
    });

    await alert.present();
    return alert;
  }
}
