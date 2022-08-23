import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {
  searchKeyword: string = null;
  foodList = null;
  cerealFlour = null;

  constructor(
    private readonly alertController: AlertController,
    private readonly foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.getFoodList();
  }

  async getFoodList() {
    this.foodList = await this.foodService.getFoodList();
  }

  addMeal(item) {
    console.log(item);
    let itemValues = {
      kcal: parseFloat(item.kcal) * (item.inputData / 100),
      carbs: parseFloat(item.carbs) * (item.inputData / 100),
      protein: parseFloat(item.protein) * (item.inputData / 100),
      fats: parseFloat(item.fats) * (item.inputData / 100),
    };

    const kcalLeft = this.foodService.addMeal(itemValues);
  }

  async enterQuantityAlert(item) {
    const alert = await this.alertController.create({
      header: item.name,
      message: 'Enter quantity',
      buttons: [
        {
          text: 'Add meal',
          handler: (inputData) =>
            this.addMeal({ ...item, inputData: parseInt(inputData[0]) }),
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
