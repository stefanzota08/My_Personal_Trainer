import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    children: [
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
        path: 'age-select',
        loadChildren: () =>
          import('./components/age-select/age-select.module').then(
            (m) => m.AgeSelectPageModule
          ),
      },
      {
        path: 'active-level-select',
        loadChildren: () =>
          import(
            './components/active-level-select/active-level-select.module'
          ).then((m) => m.ActiveLevelSelectPageModule),
      },
      {
        path: 'goal-select',
        loadChildren: () =>
          import('./components/goal-select/goal-select.module').then(
            (m) => m.GoalSelectPageModule
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
      {
        path: 'hip-measurements',
        loadChildren: () =>
          import('./components/hip-measurements/hip-measurements.module').then(
            (m) => m.HipMeasurementsPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'sign-up',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
  {
    path: 'hip-measurements',
    loadChildren: () =>
      import('./components/hip-measurements/hip-measurements.module').then(
        (m) => m.HipMeasurementsPageModule
      ),
  },
  {
    path: 'age-select',
    loadChildren: () =>
      import('./components/age-select/age-select.module').then(
        (m) => m.AgeSelectPageModule
      ),
  },
  {
    path: 'goal-select',
    loadChildren: () =>
      import('./components/goal-select/goal-select.module').then(
        (m) => m.GoalSelectPageModule
      ),
  },
  {
    path: 'active-level-select',
    loadChildren: () =>
      import(
        './components/active-level-select/active-level-select.module'
      ).then((m) => m.ActiveLevelSelectPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
