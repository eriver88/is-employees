import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      navigation: true,
      breadcrumbs: 'Employee'
    }
  },
  {
    path: 'add',
    component: EmployeeAddComponent,
    data: {
      navigation: true,
      breadcrumbs: 'Employee Add'
    }
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent,
    data: {
      navigation: true,
      breadcrumbs: 'Employee Detail',
      disable: true
    }
  },
  {
    path: 'edit/:id',
    component: EmployeeDetailComponent,
    data: {
      navigation: true,
      breadcrumbs: 'Employee Edit',
      disable: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
