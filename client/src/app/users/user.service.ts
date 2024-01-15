import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { User } from "./user.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:3000/api/users";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUsers(): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .get<User[]>(`${this.url}`)
      .subscribe((users: User[]) => usersSubject.next([...users]));
    return usersSubject.asObservable();
  }

  getUser(id: string): Observable<User> {
    let userSubject = new Subject<User>();
    this.httpClient
      .get<User>(`${this.url}/${id}`)
      .subscribe((user) => userSubject.next(user));
    return userSubject.asObservable();
  }

  getCurrentUser(): Observable<User> {
    return this.getUser(this.authService.getCurrentUserId());
  }

  getCurrentUserPermissions(): Observable<{canHost: boolean, isAdmin: boolean}> {
    let permissions = new Subject<{ canHost: boolean; isAdmin: boolean }>();
    this.getCurrentUser()
      .subscribe((user) => permissions.next(user.permissions));
    return permissions.asObservable();
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

  deleteUser(id: string): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .delete<User[]>(`${this.url}/${id}`)
      .subscribe((results) => usersSubject.next([...results]));
    return usersSubject.asObservable();
  }
}
