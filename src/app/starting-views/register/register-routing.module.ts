import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoosePasswordPage } from './components/choose-password/choose-password.page';
import { FatPercentagePage } from './components/fat-percentage/fat-percentage.page';
import { GenderSelectPage } from './components/gender-select/gender-select.page';
import { HeightSelectPage } from './components/height-select/height-select.page';
import { MeasurementsDonePage } from './components/measurements-done/measurements-done.page';
import { NeckMeasurementsPage } from './components/neck-measurements/neck-measurements.page';
import { SignUpPage } from './components/sign-up-page/sign-up.page';
import { WaistCircumferencePage } from './components/waist-circumference/waist-circumference.page';
import { WeightSelectPage } from './components/weight-select/weight-select.page';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    children: [
      {
        path: '',
        redirectTo: 'sign-up',
        pathMatch: 'full',
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./components/sign-up-page/sign-up.module').then(
            (m) => m.SignUpPageModule
          ),
      },
      {
        path: 'choose-password',
        loadChildren: () =>
          import('./components/choose-password/choose-password.module').then(
            (m) => m.ChoosePasswordPageModule
          ),
      },
      {
        path: 'gender-select',
        loadChildren: () =>
          import('./components/gender-select/gender-select.module').then(
            (m) => m.GenderSelectPageModule
          ),
      },
      {
        path: 'height-select',
        loadChildren: () =>
          import('./components/height-select/height-select.module').then(
            (m) => m.HeightSelectPageModule
          ),
      },
      {
        path: 'weight-select',
        loadChildren: () =>
          import('./components/weight-select/weight-select.module').then(
            (m) => m.WeightSelectPageModule
          ),
      },
      {
        path: 'fat-percentage',
        loadChildren: () =>
          import('./components/fat-percentage/fat-percentage.module').then(
            (m) => m.FatPercentagePageModule
          ),
      },
      {
        path: 'measurements-done',
        loadChildren: () =>
          import(
            './components/measurements-done/measurements-done.module'
          ).then((m) => m.MeasurementsDonePageModule),
      },
      {
        path: 'neck-measurements',
        loadChildren: () =>
          import(
            './components/neck-measurements/neck-measurements.module'
          ).then((m) => m.NeckMeasurementsPageModule),
      },
      {
        path: 'waist-circumference',
        loadChildren: () =>
          import(
            './components/waist-circumference/waist-circumference.module'
          ).then((m) => m.WaistCircumferencePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
