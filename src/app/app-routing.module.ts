import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './pages/login/login.module';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => LoginModule },
  { path: 'login', loadChildren: () => LoginModule },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    data: {
      navigation: true,
      breadcrumbs: 'Employee'
    },
    loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
