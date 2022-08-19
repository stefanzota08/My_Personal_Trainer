import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HipMeasurementsPage } from './hip-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: HipMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HipMeasurementsPageRoutingModule {}
