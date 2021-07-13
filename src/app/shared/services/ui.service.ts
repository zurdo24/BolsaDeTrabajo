import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController, NavController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  load: any;
  data: any;

  // para guardar los datos del popover de los filtros
  findData: FormGroup;

  constructor(private alertController: AlertController, private navCtrl: NavController,
              public actionSheetController: ActionSheetController, public platform: Platform,
              public loadingController: LoadingController) { this.initForm(); }

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
        text: 'Eliminar',
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
        text: 'Cancelar',
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
        text: 'Cancelar',
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
      ],
      backdropDismiss: false,
    });

    await alert.present();
    return alert;
  }

  async presentAlert2(header: string, subHeader: string, message: string, cssClass: string, cssClassBtn: string, mode: any) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      cssClass,
      mode,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alertButton',
          role: 'ok',
          handler: () => {
            alert.dismiss({
            });
          }
        }
      ],
      backdropDismiss: false,
    });

    await alert.present();
    return alert;
  }

  get dataFilter(): FormGroup {
    return this.findData;
  }

  set dataFilter( findData: FormGroup) {
    this.findData = findData;
  }

  initForm() {
    this.findData = new FormGroup({
      years_experience: new FormControl(''),
      job_type_id: new FormControl(''),
      city_id: new FormControl(''),
      study_programme_id: new FormControl(''),
      subject_area_id: new FormControl(''),
      salary: new FormControl('', [Validators.pattern('^[0-9]*$')])
    });
  }
}
