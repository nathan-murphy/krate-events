import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit.component.ts',
  template: ""
})
export class UserEditComponent implements OnInit {
  user: BehaviorSubject<User> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.userService.getUser(id!).subscribe((user) => {
      this.user.next(user);
    });
  }

  // editUser(user: User) {
  //   this.userService.updateUser(this.user.value._id || '', user)
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