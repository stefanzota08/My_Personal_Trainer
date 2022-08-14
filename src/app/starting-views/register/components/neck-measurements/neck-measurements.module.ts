import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeckMeasurementsPageRoutingModule } from './neck-measurements-routing.module';

import { NeckMeasurementsPage } from './neck-measurements.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeckMeasurementsPageRoutingModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [NeckMeasurementsPage],
})
export class NeckMeasurementsPageModule {}
