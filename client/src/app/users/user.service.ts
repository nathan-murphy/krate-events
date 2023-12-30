import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:3000/api/users";

  constructor(private httpClient: HttpClient) {}

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
      .post(`${this.url}`, user)
      .subscribe((user) => userSubject.next(user));
    return userSubject.asObservable();
  }

  updateUser(user: User): Observable<User> {
    let userSubject = new Subject<User>();
    this.httpClient
      .put(`${this.url}/${user._id}`, user,)
      .subscribe((user) => userSubject.next(user));
    return userSubject.asObservable();
  }

  deleteUser(id: string): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .delete<User[]>(`${this.url}/${id}`)
      .subscribe((users) => usersSubject.next([...users]));
    return usersSubject.asObservable();
  }
}
