import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './pages/login/login.module';

const routes: Routes = [
  { path: '', loadChildren: () => LoginModule },
  { path: 'login', loadChildren: () => LoginModule },
  { path: 'employee', loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
