import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  isFoodModalOpen = false;
  isBeveragesModalOpen = false;
  isSnacksModalOpen = false;

  searchKeyword: string = null;
  foodList = null;
  beveragesList = null;
  snackList = null;

  constructor(
    private readonly alertController: AlertController,
    private readonly foodService: FoodService
  ) {}
  ngOnInit() {
    this.getFoodList();
    this.getBeveragesList();
    this.getSnackList();
  }

  setFoodModalOpen(isOpen: boolean) {
    this.isFoodModalOpen = isOpen;
  }

  setBeveragesModalOpen(isOpen: boolean) {
    this.isBeveragesModalOpen = isOpen;
  }

  setSnacksModalOpen(isOpen: boolean) {
    this.isSnacksModalOpen = isOpen;
  }

  async getFoodList() {
    this.foodList = await this.foodService.getFoodList();
  }

  async getBeveragesList() {
    this.beveragesList = await this.foodService.getBeveragesList();
  }

  async getSnackList() {
    this.snackList = await this.foodService.getSnackList();
  }

  addMeal(item) {
    let itemValues = {
      kcal: parseFloat(item.kcal) * (item.inputData / 100),
      carbs: parseFloat(item.carbs) * (item.inputData / 100),
      protein: parseFloat(item.protein) * (item.inputData / 100),
      fats: parseFloat(item.fats) * (item.inputData / 100),
      inputData: item.inputData,
      name: item.name,
    };

    this.foodService.addMeal(itemValues);
  }

  addItemToTheList(type: string, inputData: any) {
    console.log(type, inputData);

    this.foodService.addNewItemToList(type, inputData);
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

  async addItemAlert(type: string) {
    const alert = await this.alertController.create({
      header: 'New item',
      message: "Enter new item's information",
      buttons: [
        {
          text: 'Add item',
          handler: (inputData) =>
            this.addItemToTheList(type, {
              name: parseInt(inputData[0]),
              kcal: parseInt(inputData[1]),
              protein: parseInt(inputData[2]),
              carbs: parseInt(inputData[3]),
              fats: parseInt(inputData[4]),
            }),
        },
      ],
      inputs: [
        {
          type: 'text',
          placeholder: 'Name',
        },
        {
          type: 'number',
          placeholder: 'Calories per 100g',
          min: 1,
          max: 9999,
        },
        {
          type: 'number',
          placeholder: 'Protein per 100g',
          min: 1,
          max: 9999,
        },
        {
          type: 'number',
          placeholder: 'Carbohydrates per 100g',
          min: 1,
          max: 9999,
        },
        {
          type: 'number',
          placeholder: 'Fats per 100g',
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
