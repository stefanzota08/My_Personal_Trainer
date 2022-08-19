import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [WeightSelectPage],
})
export class WeightSelectPageModule {}
