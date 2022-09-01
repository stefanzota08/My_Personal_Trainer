import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullWorkoutFlowPageRoutingModule } from './full-workout-flow-routing.module';

import { FullWorkoutFlowPage } from './full-workout-flow.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullWorkoutFlowPageRoutingModule,
    RoundProgressModule,
  ],
  declarations: [FullWorkoutFlowPage],
})
export class FullWorkoutFlowPageModule {}
