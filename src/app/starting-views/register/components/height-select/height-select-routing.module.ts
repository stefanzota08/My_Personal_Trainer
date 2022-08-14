import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeightSelectPage } from './height-select.page';

const routes: Routes = [
  {
    path: '',
    component: HeightSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeightSelectPageRoutingModule {}
