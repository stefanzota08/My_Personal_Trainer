import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private readonly loadingController: LoadingController,
    private readonly alertController: AlertController,
    private readonly foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.getFoodList();
  }

  async getFoodList() {
    const loading = await this.loadingController.create({
      showBackdrop: false,
      cssClass: 'custom-loading',
    });

    await loading.present();

    this.foodList = await this.foodService.getFoodList();

    await loading.dismiss();
  }

  async addMeal(item) {
    let itemValues = {
      kcal: parseFloat(item.kcal) * (item.inputData / 100),
      carbs: parseFloat(item.carbs) * (item.inputData / 100),
      protein: parseFloat(item.protein) * (item.inputData / 100),
      fats: parseFloat(item.fats) * (item.inputData / 100),
    };

    const loading = await this.loadingController.create({
      showBackdrop: false,
      cssClass: 'custom-loading',
    });

    await loading.present();

    const kcalLeft = await this.foodService.addMeal(itemValues);

    await loading.dismiss();

    if (kcalLeft === true) {
      this.successAlert();
    } else {
      this.errorAlert(kcalLeft);
    }
  }

  async enterQuantityAlert(item) {
    const alert = await this.alertController.create({
      header: item.name,
      message: 'Enter quantity',
      buttons: [
        {
          text: 'Add meal',
          role: 'confirm',
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

  async successAlert() {
    const alert = await this.alertController.create({
      message: 'Successfully added item',
      cssClass: 'alert-input',
      animated: true,
    });
    await alert.present();
  }

  async errorAlert(error) {
    const alert = await this.alertController.create({
      message: error,
      cssClass: 'alert-input',
      animated: true,
    });
    await alert.present();
  }
}
