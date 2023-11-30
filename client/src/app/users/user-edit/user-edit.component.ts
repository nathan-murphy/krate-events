import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit.component.ts',
  template: `
  <app-user-form [initialUser]="user"></app-user-form>
  `
})
export class UserEditComponent implements OnInit {
  userSubject: BehaviorSubject<User> = new BehaviorSubject({});
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('No id provided');
    }

    // this.userService.getUser(id!).subscribe((user) => {
    //   this.userSubject.next(user);
    // });

    this.user = this.userService.getUserFromCache(id);
  }

  // editUser(user: User) {
  //   this.userService.updateUser(this.user.value._name || '', user)
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['/users']);
  //       },
  //       error: (error) => {
  //         alert('Failed to update user');
  //         console.error(error);
  //       }
  //     })
  // }
}