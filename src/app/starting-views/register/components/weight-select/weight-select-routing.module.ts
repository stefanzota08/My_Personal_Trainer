import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightSelectPage } from './weight-select.page';

const routes: Routes = [
  {
    path: '',
    component: WeightSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightSelectPageRoutingModule {}
