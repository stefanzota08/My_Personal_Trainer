import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgeSelectPage } from './age-select.page';

const routes: Routes = [
  {
    path: '',
    component: AgeSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgeSelectPageRoutingModule {}
