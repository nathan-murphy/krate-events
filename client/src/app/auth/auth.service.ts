import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private API_URL = environment.apiUrl + "/auth";

  private token: string;
  private isAuthenticated: boolean = false;
  private currentUserId: string = "";
  private authStatusListener = new Subject<boolean>();
  private tokenTimer;

  constructor(private httpClient: HttpClient, private router: Router) {}

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

  loginUser(email: string, password: string) {
    this.httpClient
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${this.API_URL}/login`,
        {
          email: email,
          password: password,
        }
      )
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          const expiresInSeconds = response.expiresIn;
          this.setAuthTimer(expiresInSeconds);
          this.isAuthenticated = true;
          this.currentUserId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInSeconds * 1000
          );
          this.saveAuthData(this.token, expirationDate, this.currentUserId);
          this.router.navigate(["/potlucks"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation == null) return;
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.currentUserId = authInformation.currentUserId;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
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
