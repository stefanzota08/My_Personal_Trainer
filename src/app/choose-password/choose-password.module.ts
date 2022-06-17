import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePasswordPageRoutingModule } from './choose-password-routing.module';

import { ChoosePasswordPage } from './choose-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePasswordPageRoutingModule
  ],
  declarations: [ChoosePasswordPage]
})
export class ChoosePasswordPageModule {}
