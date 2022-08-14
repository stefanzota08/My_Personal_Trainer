import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FatPercentagePage } from './fat-percentage.page';

const routes: Routes = [
  {
    path: '',
    component: FatPercentagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FatPercentagePageRoutingModule {}
