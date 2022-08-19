import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalSelectPageRoutingModule } from './goal-select-routing.module';

import { GoalSelectPage } from './goal-select.page';
import { BackgroundCurvesComponentModule } from 'src/app/shared/background-curves/background-curves.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalSelectPageRoutingModule,
    ReactiveFormsModule,
    BackgroundCurvesComponentModule,
  ],
  declarations: [GoalSelectPage],
})
export class GoalSelectPageModule {}
