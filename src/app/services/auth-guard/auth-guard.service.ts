import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuardService {

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(obs => {
      this.authService
          .isAdminLoggedInObservable
          .pipe(filter(status => status !== undefined))
          .subscribe(isUserLoggedIn => {
        if(isUserLoggedIn) {
          obs.next(true);
        } else {
          obs.next(false);
          this.router.navigate(['/login']);
        }
      })

    })
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthGuardService).canActivate(next, state);
}
