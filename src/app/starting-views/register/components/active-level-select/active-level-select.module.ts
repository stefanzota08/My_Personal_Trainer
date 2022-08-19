import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveLevelSelectPageRoutingModule } from './active-level-select-routing.module';

import { ActiveLevelSelectPage } from './active-level-select.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveLevelSelectPageRoutingModule,
    ReactiveFormsModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [ActiveLevelSelectPage],
})
export class ActiveLevelSelectPageModule {}
