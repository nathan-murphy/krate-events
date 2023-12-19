import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    let usersSubject = new Subject<User[]>();
    this.httpClient
      .get<User[]>(`${this.url}/users`)
      .subscribe((users: User[]) => {
        usersSubject.next(users);
      });
    return usersSubject.asObservable();
  }

  getUser(id: number): Observable<User> {
    let userSubject = new Subject<User>();
    this.httpClient
      .get<User>(`${this.url}/users/${id}`)
      .subscribe((user) => userSubject.next(user));
    return userSubject.asObservable();
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/users`, user, {
      responseType: "text",
    });
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/users/${id}`, user, {
      responseType: "text",
    });
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/users/${id}`, {
      responseType: "text",
    });
  }
}
