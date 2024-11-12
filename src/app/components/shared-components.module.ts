import { NgModule } from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';

import { RouterModule } from '@angular/router';
import { DatatablesComponent } from './datatables/datatables.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
@NgModule({
  declarations: [
    DatatablesComponent,
    BreadcrumbsComponent
  ],
  exports: [
    DatatablesComponent,
    BreadcrumbsComponent
  ],
  imports: [
    RouterModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ]
})
export class SharedComponentsModule {}
