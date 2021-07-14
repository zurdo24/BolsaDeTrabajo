import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { getStorage } from '../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  protected debug = true;
  constructor(private navCtrl: NavController, public toastController: ToastController) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('_cap_token');
  //   let request = req;
  //   request = req.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  //   if (token) {
  //     request = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   }
  //   return next.handle(request).pipe(

  //     map((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         // console.log('event--->>>', event);
  //       }
  //       return event;
  //     }),
  //     catchError((errorR: HttpErrorResponse) => {
  //       // this.presentToast('FALLO DE CONEXIÓN');
  //       this.navCtrl.navigateRoot('disconnected', {animated: true});
  //       // this.router.navigate(['disconnected']);
  //       return throwError(errorR);
  //     })
  //   );
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(getStorage('token'))
      .pipe(
        switchMap(token => {
          if (token) {
            request = request.clone({
              params: new HttpParams().set('access-token', token),
            });
          }

          if (!request.headers.has('Content-Type')) {
            request = request.clone({
              setHeaders: {
                'content-type': 'application/json',
              }
              // headers: request.headers.set('Content-Type', 'application/json')
            });
          }
          request = request.clone({
            headers: request.headers.set('Accept', 'application/json',  )
          });
          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                // do nothing for now
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              // const status = error.status;
              // const reason = error && error.error.reason ? error.error.reason : '';
              this.navCtrl.navigateRoot('disconnected', {animated: true});
              // this.presentAlert(status, reason);
              return throwError(error);
            })
          );
        })
      );
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  // manejarError(error: HttpErrorResponse) {
  //   console.log(error);
  //   // this.navCtrl.navigateForward('/disconnected')
  //   // this.router.navigate(['/perfil-basico']);
  //   // return 1
  //   return throwError('error personalizado');
  // }
}
