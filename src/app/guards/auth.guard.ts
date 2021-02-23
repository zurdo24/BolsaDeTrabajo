import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController){}
  async canActivate(): Promise<boolean> {
      const token = await Storage.get({key: 'token'});
      if (token.value) {
        return true;
      } else {
        this.navCtrl.navigateRoot('/login');
        return false;
      }

  }
}
