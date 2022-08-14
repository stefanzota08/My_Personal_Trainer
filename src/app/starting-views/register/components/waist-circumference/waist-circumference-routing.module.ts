import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaistCircumferencePage } from './waist-circumference.page';

const routes: Routes = [
  {
    path: '',
    component: WaistCircumferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaistCircumferencePageRoutingModule {}
