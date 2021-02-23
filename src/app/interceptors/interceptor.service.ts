import { Injectable } from '@angular/core';
// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize,map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { Events } from 'ionic-angular'; 
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private navCtrl: NavController,private router: Router, public toastController: ToastController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('_cap_token');
    let request = req;
    request = req.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(

      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((errorR: HttpErrorResponse) => {
        // error => {
        // if (error.status === 401) {
          // if (error.error.success === false) {
            console.log(errorR)
            this.presentToast('FALLO DE CONEXIÓN');
          // } else {
            this.router.navigate(['disconnected']);
          // }
        // }
        return throwError(errorR);
      })
      // ,error => {}
        // console.log("")
      //       // logging the http response to browser's console in case of a failure
      //       if (error instanceof HttpErrorResponse) {
      //         if (error.status === 401) {
      //           this.router.navigateByUrl('/');
      //         }
      //       }
       // }
      // this.navCtrl.navigateForward('/disconnected')

      // catchError(this.manejarError)
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
