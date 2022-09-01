import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullWorkoutFlowPage } from './full-workout-flow.page';

const routes: Routes = [
  {
    path: '',
    component: FullWorkoutFlowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullWorkoutFlowPageRoutingModule {}
