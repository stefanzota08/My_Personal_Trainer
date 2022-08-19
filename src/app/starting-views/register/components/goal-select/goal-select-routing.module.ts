import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalSelectPage } from './goal-select.page';

const routes: Routes = [
  {
    path: '',
    component: GoalSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalSelectPageRoutingModule {}
