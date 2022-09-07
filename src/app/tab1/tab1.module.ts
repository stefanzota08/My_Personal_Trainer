import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    RoundProgressModule,
  ],
  declarations: [Tab1Page, TruncatePipe],
})
export class Tab1PageModule {}
