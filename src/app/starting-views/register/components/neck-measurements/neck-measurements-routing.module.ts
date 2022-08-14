import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeckMeasurementsPage } from './neck-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: NeckMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeckMeasurementsPageRoutingModule {}
