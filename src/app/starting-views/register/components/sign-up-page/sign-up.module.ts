import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';
import { SignUpPage } from './sign-up.page';
import { SignUpPageRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [SignUpPage],
})
export class SignUpPageModule {}
