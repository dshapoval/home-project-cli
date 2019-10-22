import { Injectable } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import { AppConstants } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: GoogleUser;

  constructor(
    private googleAuth: GoogleAuthService
  ) {
  }

  public getToken(): string {
    const token: string = sessionStorage.getItem(AppConstants.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(AppConstants.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        console.log(auth);
        auth.signIn().then(
          res => this.signInSuccessHandler(res),
          err => this.signInErrorHandler(err)
        );
      });
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      try {
        console.log('signOut auth', auth);
        auth.signOut();
        // auth.disconnect();
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem(AppConstants.SESSION_STORAGE_KEY);
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      AppConstants.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }

  private signInErrorHandler(err) {
    console.warn(err);
  }
}