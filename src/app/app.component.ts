import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'clipboard' },
    { title: 'Students', url: '/students', icon: 'people' },
    { title: 'Classes', url: '/classes', icon: 'school' },
    { title: 'Fees', url: '/fees', icon: 'cash' },
    { title: 'Documents', url: '/documents', icon: 'documents' }
  ];
  public isUserLoggedIn!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.authService.getAuthInfo();
      this.authService.isAdminLoggedInObservable.subscribe(isUserLoggedIn => {
          this.isUserLoggedIn = isUserLoggedIn;
      });
  }
}
