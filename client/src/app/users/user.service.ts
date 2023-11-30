import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { User } from "./user.model";
import { sampleUsers } from "./helpers";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = "http://localhost:5200";
  private allUsers: User[] = sampleUsers;
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.users$.next(sampleUsers);
  }

  private refreshUsers() {
    this.httpClient.get<User[]>(`${this.url}/users`).subscribe((users) => {
      this.users$.next(users);
    });
  }

  getUsers(): User[] {
    // this.refreshUsers();
    return this.allUsers;
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  getUserFromCache(id: number): User {
    return this.allUsers.filter(
      ( user: User ) => (id == user.id)
    )[0]
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
