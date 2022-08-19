import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  searchKeyword: string = null;
  foodList = null;
  cerealFlour = null;

  constructor(
    private readonly alertController: AlertController,
    private readonly foodService: FoodService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getFoodList();
  }

  async getFoodList() {
    this.foodList = await this.foodService.getFoodList();
    console.log(this.foodList);
  }

  addMeal(item) {
    console.log(item);
    this.authService.addMeal(item);
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      header: item.name,
      message: 'Enter quantity',
      buttons: [
        {
          text: 'Add meal',
          handler: () => this.addMeal(item),
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: 'e.g 120g',
          min: 1,
          max: 9999,
        },
      ],
      cssClass: 'alert-input',
      animated: true,
    });

    await alert.present();
  }
}
