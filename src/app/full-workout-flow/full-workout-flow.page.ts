import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WorkoutDataService } from '../services/workout-data.service';
import { WorkoutStateService } from '../services/workout-state.service';
import { UserInfoService } from '../services/user-info.service';
@Component({
  selector: 'app-full-workout-flow',
  templateUrl: './full-workout-flow.page.html',
  styleUrls: ['./full-workout-flow.page.scss'],
})
export class FullWorkoutFlowPage implements OnInit {
  current: number = 100;
  total: number = 100;

  stroke = 6;
  strokeMacro = 6;
  radius = 125;
  responsive = true;
  clockwise = true;
  color = '#efefef';
  background = 'rgba(255,255,255,.25)';
  animation = 'linearEase';
  animationDelay = 0;
  realCurrent = 0;
  duration = null;

  isTimerModalOpen: boolean = false;
  isWorkoutDone: boolean = false;
  timer: string = '00:';
  timerInterval = null;
  timerIntervalFullWorkout = null;
  nrOfSecondsFullWorkout = 0;
  seconds: number = null;
  todayWorkout = null;
  bodyPart = null;
  exerciseIndex: number = 0;
  completedExercises = [];
  totalWorkoutTime: string = '';

  constructor(
    private readonly workoutState: WorkoutStateService,
    private readonly workoutDataService: WorkoutDataService,
    private readonly router: Router,
    private readonly alertController: AlertController,
    private readonly userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.workoutState.currentWorkoutData.subscribe((data) => {
      this.todayWorkout = data.todayWorkout;
      this.bodyPart = data.bodyPart;
    });
    this.timerIntervalFullWorkout = setInterval(() => {
      this.nrOfSecondsFullWorkout += 1;
    }, 1000);
    this.openTimerModal(5000);
  }

  getOverlayStyle(textSize: number) {
    const transform = 'translateY(-50%) ' + 'translateX(-50%)';

    return {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      transform,
      fontSize: textSize + 'px',
    };
  }

  openTimerModal(duration) {
    this.duration = duration;
    this.isTimerModalOpen = true;
    this.updateTimerUI();
  }

  closeTimerModal() {
    this.isTimerModalOpen = false;
    clearInterval(this.timerInterval);
    console.log(this.todayWorkout, this.bodyPart);
  }

  updateTimerUI() {
    this.timer = '00:';
    this.seconds = this.duration / 1000; // nr de secunde
    let initialTimer = this.timer; // timer-ul gol (00:__)
    this.timer +=
      this.seconds >= 10
        ? this.seconds.toString()
        : '0' + this.seconds.toString(); // timer-ul initial (00:05) daca avem 5000 duration sau (00:30) daca avem 30000 duration

    this.timerInterval = setInterval(() => {
      this.seconds -= 1;

      if (this.seconds >= 10) {
        this.timer = initialTimer + this.seconds.toString();
      } else {
        this.timer = initialTimer + '0' + this.seconds.toString();
      }

      if (this.seconds <= 0) {
        // daca am ajuns la secunda 0 inchidem modalul si intervalul
        clearInterval(this.timerInterval);
        this.closeTimerModal();
      }
    }, 1000);
  }

  loadNextExercise() {
    this.completedExercises.push(this.todayWorkout[this.exerciseIndex]);
    if (this.exerciseIndex !== this.todayWorkout.length - 1) {
      this.openTimerModal(30000);
      this.exerciseIndex += 1;
    } else {
      this.endWorkout();
    }
  }

  endWorkout() {
    this.isWorkoutDone = true;
    clearInterval(this.timerIntervalFullWorkout);
    if (this.nrOfSecondsFullWorkout < 10) {
      this.totalWorkoutTime = '00:0' + this.nrOfSecondsFullWorkout.toString();
    } else if (this.nrOfSecondsFullWorkout < 60) {
      this.totalWorkoutTime = '00:' + this.nrOfSecondsFullWorkout.toString();
    } else {
      let minutes = Math.floor(this.nrOfSecondsFullWorkout / 60);
      let seconds = this.nrOfSecondsFullWorkout % 60;
      this.totalWorkoutTime =
        (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) +
        ':' +
        (seconds < 10 ? '0' + seconds.toString() : seconds.toString());
    }

    let workoutInformation = {
      bodyPart: this.bodyPart,
      time: this.totalWorkoutTime,
      exercisesNr: this.completedExercises.length,
    };

    this.workoutDataService.addWorkout(workoutInformation);
  }

  skipExercise() {
    if (this.exerciseIndex !== this.todayWorkout.length - 1) {
      this.exerciseIndex += 1;
    } else {
      this.endWorkout();
    }
  }

  previousExercise() {
    if (this.exerciseIndex > 0) {
      this.exerciseIndex -= 1;
    }
  }

  navigateToHomePage() {
    this.isWorkoutDone = false;
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }

  exitWorkout() {
    const rateOfCompletion =
      (this.completedExercises.length / this.todayWorkout.length) * 100;
    console.log(rateOfCompletion);
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }

  async openUpdateInfoModal() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Weight update',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (inputData) => {
            this.updateInfo(inputData);
          },
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: 'Your current weight',
          label: 'Weight',
          min: 1,
          max: 9999,
        },
      ],
    });

    await alert.present();
  }

  updateInfo(inputData) {
    console.log(inputData[0]);
    if (inputData[0]) {
      this.userInfoService.updateUserInfo({ weight: Number(inputData[0]) });
      this.navigateToHomePage();
    }
  }
}
