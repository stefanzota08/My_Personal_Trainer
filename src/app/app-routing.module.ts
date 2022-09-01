import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHomePage = () => redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./starting-views/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    ...canActivate(redirectLoggedInToHomePage),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./starting-views/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'food-list',
    loadChildren: () =>
      import('./food-list/food-list.module').then((m) => m.FoodListPageModule),
  },
  {
    path: 'full-workout-flow',
    loadChildren: () => import('./full-workout-flow/full-workout-flow.module').then( m => m.FullWorkoutFlowPageModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
