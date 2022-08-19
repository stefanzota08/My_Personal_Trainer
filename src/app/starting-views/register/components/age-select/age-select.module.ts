import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgeSelectPageRoutingModule } from './age-select-routing.module';

import { AgeSelectPage } from './age-select.page';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ConvertUnitPipeModule } from 'src/app/pipes/convert-unit.pipe';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgeSelectPageRoutingModule,
    BackgroundCurvesComponentModule,
    NgxSliderModule,
    ConvertUnitPipeModule,
  ],
  declarations: [AgeSelectPage],
})
export class AgeSelectPageModule {}
