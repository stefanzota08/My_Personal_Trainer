import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeasurementsDonePageRoutingModule } from './measurements-done-routing.module';

import { MeasurementsDonePage } from './measurements-done.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeasurementsDonePageRoutingModule
  ],
  declarations: [MeasurementsDonePage]
})
export class MeasurementsDonePageModule {}
