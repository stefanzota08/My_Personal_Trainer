import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';
import { ChoosePasswordPage } from './choose-password.page';
import { ChoosePasswordPageRoutingModule } from './choose-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePasswordPageRoutingModule,
    BackgroundCurvesComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [ChoosePasswordPage],
})
export class ChoosePasswordPageModule {}
