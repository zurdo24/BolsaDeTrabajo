import { AccesoModule } from './acceso/acceso.module';
import { InterceptorService } from './interceptors/interceptor.service';
import { VacantesModule } from './vacantes/vacantes.module';
import { MisPostulacionesModule } from './mis-postulaciones/mis-postulaciones.module';
import { PerfilBasicoModule } from './perfil-basico/perfil-basico.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MiPerfilModule } from './mi-perfil/mi-perfil.module';
import { MisOportunidadesModule } from './mis-oportunidades/mis-oportunidades.module';
import { MensajesModule } from './mensajes/mensajes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    SharedModule,
    PerfilBasicoModule,
    MisOportunidadesModule,
    MiPerfilModule,
    MisPostulacionesModule,
    VacantesModule,
    MensajesModule,
    AccesoModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
