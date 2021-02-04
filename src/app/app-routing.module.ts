import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil-basico',
    loadChildren: () => import('./perfil-basico/pages/perfil-basico/perfil-basico.module').then( m => m.PerfilBasicoPageModule)
  },
  {
    path: 'mi-perfil/home',
    loadChildren: () => import('./mi-perfil/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./mis-oportunidades/pages/opportunities/opportunities.module').then( m => m.OpportunitiesPageModule)
  },
  {
    path: 'postulations',
    loadChildren: () => import('./mis-postulaciones/pages/postulations/postulations.module').then( m => m.PostulationsPageModule)
  },
  {
    path: 'vacants',
    loadChildren: () => import('./vacantes/pages/vacants/vacants.module').then( m => m.VacantsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./mensajes/pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
