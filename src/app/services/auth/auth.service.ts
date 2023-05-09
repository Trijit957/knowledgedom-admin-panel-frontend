import { Injectable } from '@angular/core';
import { auth } from 'src/app/config/firebase/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

type LoginParamsType = {
  email: string;
  password: string;
}

type LoginResponseType = {
  status: boolean;
  userCredentials: any;
}

type LogoutResponseType = {
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminLoggedIn$ = new BehaviorSubject<boolean>(undefined!);
  public isAdminLoggedInObservable = this.isAdminLoggedIn$.asObservable();

  private userInfo$ = new BehaviorSubject<UserCredential>(undefined!);
  public userInfoObservable = this.userInfo$.asObservable();

  constructor() { }

  public login({ email, password }: LoginParamsType): Promise<LoginResponseType> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
              this.setAdminLoginStatus(true);
              resolve({
                status: true,
                userCredentials
              })
          })
          .catch(error => reject({
              status: false,
              userCredentials: null
          }));
    })
  }

  private setAdminLoginStatus(status: boolean) {
    this.isAdminLoggedIn$.next(status);
  }

  public getAuthInfo() {
    onAuthStateChanged(auth, user => {
      if(user) {
        this.setAdminLoginStatus(true);
      } else {
        this.setAdminLoginStatus(false);
      }
    })
  }

  public logout(): Promise<LogoutResponseType> {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => resolve({ status: true}))
        .catch(error => reject({ status: false }))
    })
  }

  public setUserInfo(userInfo: UserCredential) {
    this.userInfo$.next(userInfo);
  }

}
