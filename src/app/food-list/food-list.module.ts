import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodListPageRoutingModule } from './food-list-routing.module';

import { FoodListPage } from './food-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodListPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [FoodListPage],
})
export class FoodListPageModule {}
