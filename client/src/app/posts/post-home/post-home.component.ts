import { Component } from '@angular/core';

@Component({
  selector: 'app-post-home',
  template: `
  <app-post-create (postCreated) = "onPostAdded($event)"></app-post-create>
  <app-post-list [posts] = "storedPosts"></app-post-list>
  `
})
export class PostHomeComponent {
  storedPosts = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
