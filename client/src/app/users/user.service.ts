import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer;
  private url = "http://localhost:3000/api/users";
  private authUrl = "http://localhost:3000/api/auth";

  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getUsers(): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .get<User[]>(`${this.url}`)
      .subscribe((users: User[]) => usersSubject.next([...users]));
    return usersSubject.asObservable();
  }

  getUser(id: number): Observable<User> {
    let userSubject = new Subject<User>();
    this.httpClient
      .get<User>(`${this.url}/${id}`)
      .subscribe((user) => userSubject.next(user));
    return userSubject.asObservable();
  }

  addUser(user: User) {
    let userSubject = new Subject<User>();
    this.httpClient
      .post<User>(`${this.url}`, user)
      .subscribe((result) => userSubject.next(result));
    return userSubject.asObservable();
  }

  updateUser(user: User): Observable<User> {
    let userSubject = new Subject<User>();
    this.httpClient
      .put<User>(`${this.url}/${user._id}`, user)
      .subscribe((result) => userSubject.next(result));
    return userSubject.asObservable();
  }

  loginUser(email: string, password: string) {
    this.httpClient
      .post<{ token: string; expiresIn: number }>(`${this.authUrl}/login`, {
        email: email,
        password: password,
      })
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          const expiresInSeconds = response.expiresIn;
          this.setAuthTimer(expiresInSeconds);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInSeconds * 1000
          );
          this.saveAuthData(this.token, expirationDate);
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
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  deleteUser(id: string): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .delete<User[]>(`${this.url}/${id}`)
      .subscribe((results) => usersSubject.next([...results]));
    return usersSubject.asObservable();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");

    if (!token || !expirationDate) return null;

    return {
      token: token,
      expiration: new Date(expirationDate),
    };
  }
}
