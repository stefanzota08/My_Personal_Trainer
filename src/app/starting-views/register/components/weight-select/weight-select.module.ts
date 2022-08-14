import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightSelectPageRoutingModule } from './weight-select-routing.module';

import { WeightSelectPage } from './weight-select.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightSelectPageRoutingModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [WeightSelectPage],
})
export class WeightSelectPageModule {}
