import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenderSelectPageRoutingModule } from './gender-select-routing.module';

import { GenderSelectPage } from './gender-select.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackgroundCurvesComponentModule,
    GenderSelectPageRoutingModule,
  ],
  declarations: [GenderSelectPage],
})
export class GenderSelectPageModule {}
