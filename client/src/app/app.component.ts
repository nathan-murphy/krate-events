import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.autoAuthUser()
  }
}
