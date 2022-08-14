import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaistCircumferencePageRoutingModule } from './waist-circumference-routing.module';

import { WaistCircumferencePage } from './waist-circumference.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaistCircumferencePageRoutingModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [WaistCircumferencePage],
})
export class WaistCircumferencePageModule {}
