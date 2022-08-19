import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private firestore: Firestore) {}

  async getFoodList() {
    const docRef = doc(this.firestore, 'food-list/food-list');
    const result = await getDoc(docRef);
    let foodList = result.data();
    foodList = Object.keys(foodList).map((key) => {
      return foodList[key];
    });
    return foodList;
  }
}
