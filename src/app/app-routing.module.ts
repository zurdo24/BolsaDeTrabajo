import { NologinGuard } from './guards/nologin.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NologinGuard]
  },
  {
    path: 'perfil-basico',
    loadChildren: () => import('./perfil-basico/pages/perfil-basico/perfil-basico.module').then( m => m.PerfilBasicoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil/home',
    loadChildren: () => import('./mi-perfil/pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./mis-oportunidades/pages/opportunities/opportunities.module').then( m => m.OpportunitiesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'postulations',
    loadChildren: () => import('./mis-postulaciones/pages/postulations/postulations.module').then( m => m.PostulationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vacants',
    loadChildren: () => import('./vacantes/pages/vacants/vacants.module').then( m => m.VacantsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./mensajes/pages/messages/messages.module').then( m => m.MessagesPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
