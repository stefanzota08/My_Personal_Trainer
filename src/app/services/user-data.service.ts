import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData = new BehaviorSubject({
    firstName: null,
    lastName: null,
    email: null,
    genderIsFemale: null,
    height: null,
    weight: null,
    age: null,
    goal: null,
    activeLevel: null,
    fatPercentage: null,
    neckCircumference: null,
    waistCircumference: null,
    hipCircumference: null,
    leanBodyMass: null,
  });

  currentUserData = this.userData.asObservable();

  constructor(firestore: Firestore) {}

  updateUserData(data) {
    console.log(data);
    this.userData.next({ ...this.userData.value, ...data });
  }
}
