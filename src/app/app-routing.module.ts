import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/students/students.module').then( m => m.StudentsPageModule)
  },
  {
    path: 'classes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'fees',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/fees/fees.module').then( m => m.FeesPageModule)
  },
  {
    path: 'documents',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
