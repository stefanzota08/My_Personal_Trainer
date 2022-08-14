import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FatPercentagePageRoutingModule } from './fat-percentage-routing.module';

import { FatPercentagePage } from './fat-percentage.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FatPercentagePageRoutingModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [FatPercentagePage],
})
export class FatPercentagePageModule {}
