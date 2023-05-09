import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public async onLogin(form: FormGroup) {
    try {
      let loginResponse = await this.authService.login({
        email: form.value.email,
        password: form.value.password
      });
      
      if(loginResponse.status) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.log(error)
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

}
