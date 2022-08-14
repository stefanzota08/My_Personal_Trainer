import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeightSelectPageRoutingModule } from './height-select-routing.module';

import { HeightSelectPage } from './height-select.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeightSelectPageRoutingModule,
    BackgroundCurvesComponentModule,
    NgxSliderModule,
  ],
  declarations: [HeightSelectPage],
})
export class HeightSelectPageModule {}
