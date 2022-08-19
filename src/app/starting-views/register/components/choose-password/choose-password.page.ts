import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.page.html',
  styleUrls: ['./choose-password.page.scss'],
})
export class ChoosePasswordPage implements OnInit {
  passwordSelectForm: FormGroup;
  passwordsMatch: boolean = true;
  userData = null;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userDataService: UserDataService
  ) {}

  get password() {
    return this.passwordSelectForm.get('password');
  }

  get confirmPassword() {
    return this.passwordSelectForm.get('confirmPassword');
  }

  ngOnInit() {
    this.userDataService.currentUserData.pipe(take(1)).subscribe((data) => {
      this.userData = data;
    });

    this.passwordSelectForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  registerUser() {
    this.userData = {
      ...this.userData,
      ...this.passwordSelectForm.value,
    };
    if (this.password.value !== this.confirmPassword.value) {
      this.passwordsMatch = false;
      return;
    } else {
      this.passwordsMatch = true;
      this.register();
    }
  }

  async register() {
    const user = await this.authService.register({
      email: this.userData.email,
      password: this.userData.password,
    });

    if (user) {
      this.router.navigate(['../choose-password'], {
        relativeTo: this.activatedRoute,
      });
      console.log('Account created successfully!');
      this.router.navigate(['../gender-select'], {
        relativeTo: this.activatedRoute,
      });
    } else {
      console.log('Register failed!');
    }
  }
}
