import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router,
    private readonly loadingController: LoadingController
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create({
      showBackdrop: false,
      cssClass: 'custom-loading',
    });

    await loading.present();

    const user = await this.authService.login(this.loginForm.value);
    await loading.dismiss();

    if (user) {
      this.loginFailed = false;
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      this.loginFailed = true;
    }
  }
}
