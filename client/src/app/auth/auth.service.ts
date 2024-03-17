import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private API_URL = environment.apiUrl + "/auth";

  private token: string;
  private isAuthenticated: boolean = false;
  private currentUserId: string = "";
  private authStatusListener = new Subject<boolean>();
  private errorMessageListener = new Subject<string>();

  private tokenTimer;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getToken(): string {
    return this.token;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getErrorMessageListener(): Observable<string> {
    return this.errorMessageListener.asObservable();
  }

  loginUser(email: string, password: string) {
    this.httpClient
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${this.API_URL}/login`,
        {
          email: email,
          password: password,
        }
      )
      .subscribe({
        next: (response) => {
          if (response.token) {
            const expiresIn = response.expiresIn;
            this.setUserToken(response.userId, response.token, expiresIn)
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresIn * 1000
            );
            this.saveAuthData(this.token, expirationDate, this.currentUserId);
            this.router.navigate(["/potlucks"]);
          }
        },
        error: (error) => this.errorMessageListener.next(error.error.message)
      });
  }

  private setUserToken(userId: string, token: string, tokenExpirationInSeconds: number) {
    this.token = token;
    this.currentUserId = userId;
    this.setAuthTimer(tokenExpirationInSeconds);
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation == null) return;
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0)
      this.setUserToken(authInformation.currentUserId, authInformation.token, (expiresIn / 1000))
  }

  logout() {
    this.token = null;
    this.currentUserId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    currentUserId: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("currentUserId", currentUserId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("currentUserId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const currentUserId = localStorage.getItem("currentUserId");

    if (!token || !expirationDate || !currentUserId) return null;

    return {
      token: token,
      expiration: new Date(expirationDate),
      currentUserId: currentUserId,
    };
  }
}
