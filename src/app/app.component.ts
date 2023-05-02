import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'clipboard' },
    { title: 'Students', url: '/students', icon: 'people' },
    { title: 'Classes', url: '/classes', icon: 'school' },
    { title: 'Fees', url: '/fees', icon: 'cash' },
    { title: 'Documents', url: '/documents', icon: 'documents' }
  ];
  constructor() {}
}
