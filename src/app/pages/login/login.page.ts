import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SizeService } from 'src/app/services/size/size.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm!: FormGroup;
  public sizeMode!: number;
  public fieldType: string = 'password';
  public passwordHideShowIcon: string = 'eye';
  public isLoading!: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly sizeService: SizeService,
    private readonly toastService: ToastService
  ) {
    this.sizeService.sizeObservable.subscribe({
      next: (sizeMode) => this.sizeMode = sizeMode
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public async onLogin(form: FormGroup) {
    try {
      this.isLoading = true;

      let loginResponse = await this.authService.login({
        email: form.value.email,
        password: form.value.password
      });
      
      if(loginResponse.status) {
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
        await this.toastService.show({
          message: 'You are successfully logged in!',
          duration: 3000,
          status: 'success'
        });
      }

    } catch (error) {
      console.log(error);
      this.isLoading = false;
      await this.toastService.show({
        message: 'Email or Password is not valid!',
        duration: 2000,
        status: 'danger'
      });
    }
  }

  public async onLogout() {
    try {
      let logoutResponse = await this.authService.logout();

      if(logoutResponse.status) {
        this.router.navigate(['/login']);
      }

    } catch (error) {
      console.log(error)
    }
  }

  public hideShowPassword() {
    this.fieldType = this.fieldType === 'password' ? 'text' : 'password';
    this.passwordHideShowIcon = this.passwordHideShowIcon === 'eye' ? 'eye-off' : 'eye';
  }

}
