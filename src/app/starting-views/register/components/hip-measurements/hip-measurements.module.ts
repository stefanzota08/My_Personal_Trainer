import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HipMeasurementsPageRoutingModule } from './hip-measurements-routing.module';

import { HipMeasurementsPage } from './hip-measurements.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HipMeasurementsPageRoutingModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [HipMeasurementsPage],
})
export class HipMeasurementsPageModule {}
