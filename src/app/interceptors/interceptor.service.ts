import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private navCtrl: NavController,private router: Router) { }

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
      // this.navCtrl.navigateForward('/disconnected')

      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse) {
    console.log(error);
    // this.navCtrl.navigateForward('/disconnected')
    // this.router.navigate(['/perfil-basico']);
    // return 1
    return throwError('error personalizado');
  }
}
