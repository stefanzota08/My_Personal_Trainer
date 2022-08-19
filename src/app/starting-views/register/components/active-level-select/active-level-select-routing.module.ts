import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveLevelSelectPage } from './active-level-select.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveLevelSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveLevelSelectPageRoutingModule {}
